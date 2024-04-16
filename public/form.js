let uploadForm = document.getElementById("upload-form");
let fileInputField = document.querySelector(".fileInput");
uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData();
  formData.append("result", fileInputField.files[0]);
  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let rightContent = `
      <div class = "metadata">
      <h3> Course Title: ${data.classData.courseTitle}</h3>
    <div class = "metadata-row">
      <div class  = "metadata-left">
      <p> Department : ${data.classData.department}</p>
      <p> Credit Units : ${data.classData.creditUnit}</p>
      </div>
     <div class = "metadata-right">
      <p> Student Set : ${data.classData.studentSet}</p>
      <p> Semester : ${data.classData.semester}</p>
      </div>
    </div>
      </div>
       <table class = "styled-table">
       <thead>
        <tr>

         <th>S/N</th>
         <th>Mat No.</th>
         <th>Total</th>
         <th> Grade</th>
         <th>Exam</th>
         <th>CA</th>
        </tr>
        </thead>
        <tbody>
      `;
      data.data.forEach((result) => {
        rightContent += `
        <tr>
          <td>${result[0]}</td>
          <td>${result[1]}</td>
          <td>${result[2]}</td>
          <td>${result[3]}</td>
          <td>${result[4]}</td>
          <td>${result[5]}</td>
        </tr>
        `;
      });
      rightContent += `
      </tbod>
      </table>
      `;

      document.querySelector(".right").innerHTML = rightContent;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
