(function() {

    // Used to hold information from aside.md and activity.md
    var data = {
        config: {},
        activity: {}
    };


    // Builds the top menu
    function bindNavigationData() {
        var source = $("#navigation-template").html();
        var template = Handlebars.compile(source);

        console.log("Binding navigation data...");

        $("#navigation").html(template(data));
    }

    // Builds the left sidebar
    function bindAsideData() {
        var source = $("#aside-template").html();
        var template = Handlebars.compile(source);

        console.log("Loading aside.md markdown file...");

        function successfulyLoadedMarkdownFile(markdownData) {
            var asideData = metaMarked(markdownData);

            data.activity.aside = asideData.html;

            console.log("Binding aside data...");

            $(".aside").html(template(data));
        }

        $.ajax({
            url: "data/aside.md",
            type: 'get',
            dataType: 'html',
            success: successfulyLoadedMarkdownFile
        });

    }

    // Builds the main content area
    function bindActivityData() {
        var source = $("#activity-template").html();
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


            // All other data is only inserted after the succesful insertion of the main content area
            bindNavigationData();
            bindAsideData();
            bindFooterData();

        }

        $.ajax({
            url: "data/activity.md",
            type: 'get',
            dataType: 'html',
            success: successfulyLoadedMarkdownFile
        });

    }

    // Build the footer data
    function bindFooterData() {
        var source = $("#footer-template").html();
        var template = Handlebars.compile(source);

        console.log("Binding footer data...");

        $(".footer").html(template(data));
    }

    // Handlebar helpers
    Handlebars.registerHelper('competencyButton', function (competency) {

        var source = $("#competency-button-template").html();
        var template = Handlebars.compile(source);
        var data = {competency: competency};

        console.log("competency: ", competency);

        return template(data);
    });

    Handlebars.registerHelper('toLowerCase', function (str) {
        return str.toLowerCase();
    });

    // Load main content area and start the app.
    bindActivityData();
}());