const stCreateTemplate = document.querySelector(".st-create-template");
const stText = document.querySelector(".st-text");
// const stCreatePlain = document.querySelector(".st-create-plain");

stCreateTemplate.addEventListener("click", function () {
  const data = CKEDITOR.instances.editor1.getData();
  let processedData;
  if (data.indexOf("{{st-replace}}")) {
    processedData = data.replaceAll(
      "{{st-replace}}",
      '<span class="allowDrop">replace</span>'
    );
    console.log(processedData);
  }
  console.log("Inside editor", processedData);
  postData("http://localhost:3000/templates", { template: processedData });
});

// stCreatePlain.addEventListener("click", function () {
//   const data = stText.innerHTML;
//   let processedData;
//   if (data.indexOf("{{st-replace}}")) {
//     processedData = data.replaceAll(
//       "{{st-replace}}",
//       '<span class="allowDrop">replace</span>'
//     );
//     console.log(processedData);
//   }
//   console.log("Inside editor", processedData);
//   postData("http://localhost:3000/templates", { template: processedData });
// });

CKEDITOR.replace("editor1");

const stKeyword = document.querySelector(".st-keyword");

stKeyword.addEventListener("click", function (e) {
  navigator.clipboard.writeText("{{st-replace}}").then(
    () => {
      /* clipboard successfully set */
    },
    () => {
      /* clipboard write failed */
    }
  );
});

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
