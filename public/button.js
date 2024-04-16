// Get the file input element
const fileInput = document.getElementById("result");

// Get the selected file name display element
const selectedFileName = document.getElementById("selectedFileName");
const label = document.querySelector(".custom-file-upload");

// Add event listener to file input to update selected file name display
fileInput.addEventListener("change", () => {
  const fileName = fileInput.files[0].name;
  selectedFileName.textContent = fileName;
  label.textContent = "Result Uploaded";
});
