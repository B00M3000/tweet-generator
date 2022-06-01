let params = new URLSearchParams(document.location.search)

function updateParam(key, value){
  params.set(key, value)
  window.history.replaceState(null, null, "?" + params.toString());
}

function deleteParam(key){
  params.delete(key)
  window.history.replaceState(null, null, "?" + params.toString());
}

let textInputsIds = ["name", "username", "message", "time", "date", "client", "retweets", "quotes", "likes"]

textInputsIds.forEach(tii => {
  let input = document.getElementById(tii)
  let value = params.get(tii)
  input.value = value
  let inputEvent = new InputEvent("input")
  input.dispatchEvent(inputEvent)

  input.addEventListener("input", e => {
    updateParam(tii, input.value)
  })
})

let radioInputs = document.querySelectorAll('input[type="radio"]')

radioInputs.forEach(ri => {
  let checked = params.get(ri.value)
  ri.checked = checked

  let inputEvent = new InputEvent("change")
  ri.dispatchEvent(inputEvent)

  ri.addEventListener("input", e => {
    updateParam(ri.value, "true")
    radioInputs.forEach(ri => {
      if(!ri.checked){
        deleteParam(ri.value)
      }
    })
  })
})

let fileInput = document.getElementById('avatar')

const fileDataURL = params.get('avatar')

fileInput.files[0] = fileDataURL ? dataURLtoFile(fileDataURL) : undefined

fileInput.addEventListener('change', e => {
  let file = fileInput.files[0]
  
  const reader = new FileReader();
  reader.onloadend = () => {
    updateParam("avatar", reader.result)
  };
  
  reader.readAsDataURL(file);
})

 function dataURLtoFile(dataUrl, fileName){
  var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, {type:mime});
}