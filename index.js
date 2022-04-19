const ResumeParser = require("cv-parser-multiformats");
const pdf2html = require("pdf2html");
const fs = require("fs");

pdf2html.html("sample-resume.pdf", (err, html) => {
  if (err) {
    console.error("Conversion error: " + err);
  } else {
    fs.writeFile("sample-resume.html", html, function (err) {
      if (err) {
        return console.log(err);
      }

      ResumeParser.parseResumeFile("sample-resume.html", ".")
        .then((file) => {
          console.log("JSON is written to " + file + ".json");
          fs.unlinkSync(file);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
});

// From file to file
// ResumeParser.parseResumeFile("PerryResume16.html", ".") // input file, output dir
//   .then((file) => {
//     console.log("Yay! " + file);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// From URL
// ResumeParser
//   .parseResumeUrl('https://showcase-dev-attachmentsbucket-1zd3mf10gr28.s3.amazonaws.com/public/PerryResume16.pdf') // url
//   .then(data => {
//     console.log('Yay! ', data);
//   })
//   .catch(error => {
//     console.error(error);
//   });
