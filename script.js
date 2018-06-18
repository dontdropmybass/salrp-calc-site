const table_header = "<tr><th>Offense</th><th>Fine</th><th>Jail Time</th><th>#</th></tr>";
const categories = ["Traffic Violations", "Criminal Traffic Violations", "Criminal Offenses", "Public Acts"];

let jail-time = 0;
let fine-amount = 0;

$(function() {
    $.ajax({
        dataType: "json",
        url: "offenses.json",
        success: function(charges) {
            printCharges(charges);
        },
        error: function(e) {
            printCharges(e);
        }
    });

    $("#reset").click(reset());
});

function printCharges(charges) {
    let text = $("#charges").html();
    for (i = 0; i < categories.length; i++) {
        text += "<h1>" + categories[i] + "</h1><br/>";
        text += "<table>" + table_header;
        for (j = 0; j < charges.length; j++) {
            if (charges[j]["category"]===categories[i]) {
                charge = charges[j];
                text += "<tr><td>" + charge["offense_name"] + "</td>";
                text += "<td><button id='charge"+j+"'><i class='fas fa-info-circle'></i></button></td>"
                text += "<td>" + charge["fine_amount"]?charge["fine_amount"]:"N/A" + "</td>";
                text += "<td>" + charge["jail_time"]?charge["jail_time"]:"N/A" + "</td>";
                text += "<td><label for='charge-"+j+"-count'>x</label><input id='charge-"+j+"-count' type='number' name='charge-"+j+"-count' value='0' min='0' max='10'/></td>"
                text += "</tr>";
                $("#charge"+j).click(function() {
                    $("#description").html(charge["description"]);
                    $("#dialog").dialog("open");
                    return false;
                });
                $("#charge-"+j+"-count").change(function() {
                    updateValues();
                });
                console.log(charge);
            }
        }
        text += "</table>";
    }
    $("#charges").html(text);
}

function reset() {
    $(':input').val('0');
    $("#max-fine-amount").html("0");
    $("#max-jail-time").html("0");
}

function updateValues() {
    fine-amount = 0;
    jail-time = 0;
    for (i = 0; i < $("input").length; i++) {
        if ($("input")[i].val() > 0) {
            charge-id = $("input")[i].attr('id').split("-")[1];
            fine-amount += charges[charge-id]["fine_amount"] * $("input")[i].val();
            jail-time += charges[charge-id]["jail_time"] * $("input")[i].val();
        }
    }
    $("#max-fine-amount").html(fine-amount);
    $("#max-jail-time").html(jail-time);
}
