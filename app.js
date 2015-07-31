var data = {
    config: {},
    activity: {}
};


function bindNavigationData() {
    var source   = $("#navigation-template").html();
    var template = Handlebars.compile(source);

    console.log("Binding navigation data...");

    $("#navigation").html(template(data));
}

function bindAsideData() {
    var source   = $("#aside-template").html();
    var template = Handlebars.compile(source);

    console.log("Loading aside.md markdown file...");

    function successfulyLoadedMarkdownFile(markdownData) {
        var asideData = metaMarked(markdownData);

        data.activity.aside = asideData.html;

        console.log("Binding aside data...");

        $(".aside").html(template(data));
    }

    $.ajax({
            url: "data/aside.txt",
            type: 'get',
            dataType: 'html',
            success: successfulyLoadedMarkdownFile
    });

}

function bindActivityData() {
    var source   = $("#activity-template").html();
    var template = Handlebars.compile(source);

    console.log("Loading activity.md markdown file...");

    function successfulyLoadedMarkdownFile(markdownData) {
        var activityData = metaMarked(markdownData);
        data.activity.activity = activityData.html;
        data.activity.meta = activityData.meta;

        console.log("Binding activity data...");
        console.log("meta", activityData.meta);

        document.title = "Activity: " + activityData.meta.title;

        $(".main").html(template(data));

        // Fix some CSS stuff because markdown can't handle paragraph classes

        $(".activity-instructions > p:nth-child(4)").addClass("lead");
        $(".activity-instructions > p:nth-child(5)").addClass("leadTime");
        $(".activity-instructions > hr + p").addClass("time");


        // Execute other bindings
        bindNavigationData();
        bindAsideData();
        bindFooterData();

    }

    $.ajax({
        url: "data/activity.txt",
        type: 'get',
        dataType: 'html',
        success: successfulyLoadedMarkdownFile
    });

}

function bindFooterData() {
    var source   = $("#footer-template").html();
    var template = Handlebars.compile(source);

    console.log("Binding footer data...");

    $(".footer").html(template(data));
}

// Handlebar helpers
Handlebars.registerHelper('competencyButton', function(competency) {

    var source   = $("#competency-button-template").html();
    var template = Handlebars.compile(source);
    var data = {competency: competency};

    console.log("competency: ", competency);

   return template(data);
});


// Load everything

bindActivityData();
