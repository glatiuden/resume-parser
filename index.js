const ResumeParser = require("simple-resume-parser");
const pdf2html = require("pdf2html");
const fs = require("fs");

pdf2html.text("sample-resume.pdf", (err, file) => {
  if (err) {
    console.error("Conversion error: " + err);
  } else {
    const temp_html_file_name = "sample-resume.txt";
    fs.writeFile(temp_html_file_name, file, function (err) {
      if (err) {
        return console.log(err);
      }

      const resume = new ResumeParser(temp_html_file_name);
      resume
        .parseToJSON()
        .then((data) => {
          console.log("JSON Output: ", data);
          fs.unlinkSync(temp_html_file_name);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
});
