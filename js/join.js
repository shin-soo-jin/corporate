const form = document.querySelector("#joinForm");
const btnSubmit = document.querySelector("input[type=submit]");

btnSubmit.addEventListener("click", (e) => {

  if (!isCheck("agree")) e.preventDefault();
  if (!isTxt("id", 5)) e.preventDefault();
  if (!isEmail("email")) e.preventDefault();
  if (!isPwd("pwd1", "pwd2", 8)) e.preventDefault();
})

function isCheck(el) {
  let input = form.querySelector(`[name=${el}]`);
  let isCheck = false;

  if (input.checked) isCheck = true;

  if (isCheck) {
    const errMsgs = input.parentElement.querySelectorAll("span");
    if (errMsgs.length > 0) input.parentElement.querySelector("span").remove();

    return true;
  } else {
    const errMsgs = input.parentElement.querySelectorAll("span");
    if (errMsgs.length > 0) return false;

    const errMsg = document.createElement("span");
    errMsg.innerHTML = `<i class="fas fa-info-circle"></i>이용약관에 동의해주세요`;
    input.parentElement.append(errMsg);

    return false;
  }
}

function isTxt(el, len) {
  if (len === undefined) len = 5;

  let input = form.querySelector(`[name=${el}]`);
  let txt = input.value;

  if (txt.length >= len) {
    const errMsgs = input.closest("td").querySelectorAll("span");
    if (errMsgs.length > 0) input.closest("td").querySelector("span").remove();

    return true;
  } else {
    const errMsgs = input.closest("td").querySelectorAll("span");
    if (errMsgs.length > 0) return false;

    const errMsg = document.createElement("span");
    errMsg.innerHTML = `<i class="fas fa-info-circle"></i>ID는 ${len}글자 이상 입력해주세요`;
    input.closest("td").append(errMsg);

    return false;
  }
}

function isPwd(el1, el2, len) {
  let pwd1 = form.querySelector(`[name=${el1}]`);
  let pwd2 = form.querySelector(`[name=${el2}]`);
  let pwd1_val = pwd1.value;
  let pwd2_val = pwd2.value;

  const num = /[0-9]/;
  const eng = /[a-zA-Z]/;
  const spc = /[~!@#$%^&*()_+?><]/;

  if (pwd1_val.length >= len && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val)) {
    const errMsgs1 = pwd1.closest("td").querySelectorAll("span");
    if (errMsgs1.length > 0) pwd1.closest("td").querySelector("span").remove();

    if (pwd1_val === pwd2_val) {
      const errMsgs2 = pwd2.closest("td").querySelectorAll("span");
      if (errMsgs2.length > 0) pwd2.closest("td").querySelector("span").remove();

      return true;
    } else {
      const errMsgs2 = pwd2.closest("td").querySelectorAll("span");
      if (errMsgs2.length > 0) return false;

      const errMsg2 = document.createElement("span");
      errMsg2.innerHTML = `<i class="fas fa-info-circle"></i>PASSWORD와 동일하게 입력해주세요`;
      pwd2.closest("td").append(errMsg2);

      return false;
    }

  } else {
    const errMsgs1 = pwd1.closest("td").querySelectorAll("span");
    if (errMsgs1.length > 0) return false;

    const errMsg1 = document.createElement("span");
    errMsg1.innerHTML = `<i class="fas fa-info-circle"></i>PASSWORD는 ${len}글자 이상, 영문, 숫자, 특수문자를 포함하여 입력해주세요`;
    pwd1.closest("td").append(errMsg1);

    return false;
  }
}

function isEmail(el) {
  let input = form.querySelector(`[name=${el}]`);
  let txt = input.value;

  if (/@/.test(txt)) {
    const errMsgs = input.closest("td").querySelectorAll("span");
    if (errMsgs.length > 0) input.closest("td").querySelector("span").remove();

    return true;
  } else {
    const errMsgs = input.closest("td").querySelectorAll("span");
    if (errMsgs.length > 0) return false;

    const errMsg = document.createElement("span");
    errMsg.innerHTML = `<i class="fas fa-info-circle"></i>E-MAIL은 @를 포함한 전체 이메일 주소를 입력해주세요`;
    input.closest("td").append(errMsg);

    return false;
  }
}
