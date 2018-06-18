$(function() {
    console.log("start");
    const categories = ["Traffic Violations", "Criminal Traffic Violations", "Criminal Offenses", "Public Acts"];
    $.ajax({
        dataType: "json",
        url: "offenses.json",
        success: function(charges) {
            const table_header = "<tr><th>Offense</th><th>Fine</th><th>Jail Time</th></tr>";
            let text = $("#charges").html();
            console.log(categories.length);
            console.log(charges.length);
            for (i = 0; i < categories.length; i++) {
                text += "<h1>" + categories[i] + "</h1><br/>";
                text += "<table>" + table_header;
                for (j = 0; j < charges.length; j++) {
                    if (charges[j]["category"]===categories[i]) {
                        charge = charges[j];
                        text += "<tr id='charge"+j+"''><td>" + charge["offense"] + "</td>";
                        text += "<td>" + charge["fine_amount"] + "</td>";
                        text += "<td>" + charge["jail_time"] + "</td></tr>";
                        $("#charge"+j).onhover(function() {
                            $("#description").html(charge["description"]);
                        });
                        console.log(charge);
                    }
                }
                text += "</table>";
            }
            $("#charges").html(text);
        },
        error: function(e) {
            console.log(e);
        }
    });
});
