$(document).ready(function() {
    console.log('start');

    // precomfpile
    var listTemplate = Hogan.compile($("#list-Template").html());
    var writeTemplate = Hogan.compile($("#write-Template").html());
    var editTemplate = Hogan.compile($("#edit-Template").html());
    var viewTemplate = Hogan.compile($("#view-Template").html());

    // 함수 선언부
    function getRenderedTemplate(template, data) {
        var renderedText = template.render(data);
        return renderedText;
    }

    function loading() {
        $("#wrap").html('Loading.........');
    }

    function onListView() {
        var param = {};
        XHR(param, function(data) {
            $("#wrap").html(getRenderedTemplate(listTemplate, data));
        }, null, loading(), null, {
            url: 'json/list.json'
        });
    }

    function onWriteView() {
        var param = {};
        XHR(param, function(data) {
            $("#wrap").html(getRenderedTemplate(writeTemplate, {}));
        }, null, loading(), null, {

        });
    }

    function onEditView() {
        var no = $(this).attr("data-no");
        var param = {};
        XHR(param, function(data) {
            $("#wrap").html(getRenderedTemplate(editTemplate, data));
        }, null, loading(), null, {
            url: 'json/view_' + no +'.json'
        });
    }

    function onDetailView() {
        var no = $(this).attr("data-no");
        var param = {};
        XHR(param, function(data) {
            $("#wrap").html(getRenderedTemplate(viewTemplate, data));
        }, null, loading(), null, {
            url: 'json/view_' + no +'.json'
        });
    }

    function onWrite () {
        var alertContents = "저장했습니다.(시늉만)\n";
        alertContents += "subject : " + $("#write_subject").val() + "\n";
        alertContents += "contents : " + $("#write_contents").val();
        alert(alertContents);

        var param= {
            subject : $("#write_subject").val(),
            contents : $("#write_contents").val()
        }

        onListView();
    }

    function onEdit () {
        var alertContents = "수정했습니다.(시늉만)\n";
        alertContents += "subject : " + $("#edit_subject").val() + "\n";
        alertContents += "contents : " + $("#edit_contents").val();
        alert(alertContents);

        var no = $(this).attr("data-no");
        var param = {};
        XHR(param, function(data) {
            $("#wrap").html(getRenderedTemplate(viewTemplate, data));
        }, null, loading(), null, {
            url: 'json/view_' + no +'.json'
        });
    }



    // Event 설정
    var documentEl = $(document);
    documentEl.on('click', ".linkwrite", onWriteView);
    documentEl.on('click', ".linkview", onDetailView);
    documentEl.on('click', ".linkedit", onEditView);
    documentEl.on('click', ".linklist", onListView);
    documentEl.on('click', ".write", onWrite);
    documentEl.on('click', ".edit", onEdit);


    // 초기 화면 설정
    onListView();

    console.log('end');
});