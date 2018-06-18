const table_header = "<tr><th>Offense</th><th>Info</th><th>Fine</th><th>Jail Time</th><th>#</th></tr>";
const categories = ["Traffic Violations", "Criminal Traffic Violations", "Criminal Offenses", "Public Acts"];

let jailTime = 0;
let fineAmount = 0;
let chargeText = "";

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
                text += "<td>" + (charge["has_fine"]?charge["fine_amount"]:"N/A") + "</td>";
                text += "<td>" + (charge["has_jail"]?charge["jail_time"]:"N/A") + "</td>";
                text += "<td><label>x</label><input type='number' onchange='updateValues("+j+")' value='0' min='0' max='10'/></td>"
                text += "</tr>";
                $("#charge"+j).click(function() {
                    $("#description").html(charge["description"]);
                    $("#dialog").dialog("open");
                    return false;
                });
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
    console.log("updating...");
    fineAmount = 0;
    jailTime = 0;
    chargeText = "";
    for (i = 0; i < $(":input").length; i++) {
        if ($(":input")[i].val() > 0) {
            chargeId = $(":input")[i].attr('id').split("-")[1];
            fineAmount += charges[chargeId]["fine_amount"] * $("input")[i].val();
            jailTime += charges[chargeId]["jail_time"] * $("input")[i].val();
            chargeText += charges[chargeId]["offense_name"];
            if ($(":input")[i].val() > 1) {
                chargeText += " (x"+$("input")[i].val()+")";
            }
            chargeText += ", ";
        }
    }
    chargeText = chargeText.slice(0, -2);
    $("#max-fine-amount").html(fineAmount);
    $("#max-jail-time").html(jailTime);
    $("#charge-text").html(chargeText);
}
