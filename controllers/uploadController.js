const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const xlsx = require("xlsx");

exports.renderPage = catchAsync(async (req, res, next) => {
  res.render("index");
});

exports.resultUpload = catchAsync(
  async (req, res, next) => {
    if (!req.file) return next(new AppError("No file upload", 400));
    const fileBuffer = req.file.buffer;
    // xlsx read
    let workbook = xlsx.read(fileBuffer);
    let workbook_sheet = workbook.SheetNames; // Step 3
    let worksheet = workbook.Sheets[workbook_sheet[0]];

    //  Fetch Fixed non recurring data
    let department = worksheet.A3.v.split(":")[1].trim();
    let courseCode = worksheet.A4.v.split(":")[1].trim();
    let courseTitle = worksheet.A5.v.split(":")[1].trim();
    let studentSet = worksheet.E3.v.split(":")[1].trim();
    let creditUnit = worksheet.E4.v.split(":")[1].trim();
    let semester = courseCode.split(".")[1].trim() == "1" ? "First" : "Second";
    //  Fetch recurring rows
    //  Fetch last row
    const endRow = xlsx.utils.decode_range(worksheet["!ref"]).e.r;

    const startRow = 8;
    // list of columns to extract
    const columnsToExtract = [0, 1, 2, 3, 20, 21];
    //  TODO find scores based on regex and input values rather fixed cells
    // Iterate over rows
    let results = [];
    for (let row = startRow; row <= endRow; row++) {
      const serialNumber =
        worksheet[xlsx.utils.encode_cell({ r: row, c: 0 })]?.v; // Assuming serial number is in the first column (column A)
      const rowData = xlsx.utils.sheet_to_json(worksheet, { header: 1 })[row]; // Get row data as an array
      if (serialNumber && rowData) {
        const extractedData = columnsToExtract.map(
          (colIndex) => rowData[colIndex]
        );
        results.push(extractedData);
      }
    }

    //  Fetch recurrring data
    //  Parse to array of arrrays

    res.status(200).send({
      // Step 5
      message: "Success",
      classData: {
        courseTitle,
        courseCode,
        department,
        creditUnit,
        studentSet,
        semester,
      },
      data: results,
    });
  }
  // Read excel file
);
