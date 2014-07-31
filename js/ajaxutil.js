/**
* jQuery AJAX 
*/
function XHR(data, callbackFunc, exceptionFunc, localStartFunc, localEndFunc, options) {
    $.support.cors = (options != undefined &&  options.crossDomain ? true : false);
    $.ajax({
        url: (options != null && options.url != "" ? options.url : ""),
        type: (options != null && options.type != "" ? options.type : "POST"),
        dataType: (options != null && options.dataType != "" ? options.dataType : "json"),
        data: data,
        contentType: (options != null && options.contentType != "" ? options.contentType : "application/json; charset=utf-8"),

        success: function (data, textStatus) {
            var result;
            try {
                result = eval('(' + data + ')');
                //alert("data=" + data + "***");
                //alert("메세지=" + result._EXCEPTION_.message + "***");
            } catch (ex) { }
            if (typeof (result) == 'object') {  // JSON 오프젝트로 받음(리턴값이 JSON이거나 Exception 발생시)                    

                if (result == null) {
                    if (callbackFunc) { // 익셉션이 아니고 callback 펑션이 있을때.
                        callbackFunc(result);
                    }
                } else if (result._EXCEPTION_) {
                    if (exceptionFunc) { // 익셉션 처리 함수가 있으면 
                        exceptionFunc(result._EXCEPTION_);
                    } else {
                        _processException(result._EXCEPTION_);
                    }
                } else if (result._SESSION_OUT_) { // 세션 아웃 처리
                    alert(result._SESSION_OUT_.message);
                    if (result._SESSION_OUT_.redirectUrl != "") {
                        parent.location.href = redirectUrl;
                    }
                } else {
                    if (callbackFunc) { // 익셉션이 아니고 callback 펑션이 있을때.
                        callbackFunc(result);
                    }
                }
            } else {
                if (callbackFunc) { // HTML 형식의 리턴이며 callback 펑션이 있을때.
                    callbackFunc(data);
                }
            }
        },
        beforeSend: function () { // 로컬 이벤트 , 시작
            if (localStartFunc) {
                localStartFunc();
            }
        },
        complete: function () { // 로컬 이벤트 , 끝
            if (localEndFunc) {
                localEndFunc();
            }
        },
        //error: AjaxFailed
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (window.console == undefined)
                console = { log: function () { } };
            //console.log("debug : " + XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText + ' (' + errorThrown.description + ')');
            //alert("debug : " + XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText + ' (' + errorThrown.description + ')');
            if (exceptionFunc) // 익셉션 처리 함수가 있으면 
            {
                var errorData = new Object();
                errorData.status = XMLHttpRequest.status;
                errorData.statusText = XMLHttpRequest.statusText;
                errorData.responseText = XMLHttpRequest.responseText;
                exceptionFunc(errorData);
            }
        }
    });
}
/**
* 기본 exception 처리 함수
*/
function _processException(exceptionModel) {
    var str = "";
    if (exceptionModel.code != null && exceptionModel.code != "") {
        str = str + exceptionModel.code + "\n";
        str = str + exceptionModel.obj + "\n";
        str = str + exceptionModel.url + "\n";
        str = str + exceptionModel.message + "\n";
    }
    else if (exceptionModel.message != null && exceptionModel.message != "") {
        str = str + exceptionModel.message + "\n";
    }
    else {
        str = str + "알수없는 오류가 발생하였습니다.";
    }
    alert(str);
}
