const table_header = "<tr><th>Offense</th><th>Info</th><th>Fine</th><th>Jail Time</th><th>#</th></tr>";
const categories = ["Traffic Violations", "Criminal Traffic Violations", "Criminal Offenses", "Public Acts"];

let jailTime = 0;
let fineAmount = 0;
let chargeText = "";
let charges = [];

$(function() {
    $.ajax({
        dataType: "json",
        url: "offenses.json",
        success: function(c) {
            printCharges(c);
        },
        error: function(e) {
            console.log(e);
        }
    });
});

function printCharges(c) {
    charges = c;
    let text = $("#charges").html();
    text += "<table>";
    for (i = 0; i < categories.length; i++) {
        text += "<tr class='subtitle-row'><td colspan='5'>" + categories[i] + "</td></tr>";
        text += table_header;
        for (j = 0; j < charges.length; j++) {
            if (charges[j]["category"]===categories[i]) {
                charge = charges[j];
                text += "<tr><td>" + charge["offense_name"] + "</td>";
                text += "<td style='text-align: center;'><button onclick='showDescription("+j+")''><i class='fas fa-info-circle'></i></button></td>"
                text += "<td style='text-align: center;'>" + (charge["has_fine"]?charge["fine_amount"]:"N/A") + "</td>";
                text += "<td style='text-align: center;'>" + (charge["has_jail"]?charge["jail_time"]:"N/A") + "</td>";
                text += "<td><label for='input-"+j+"'>x</label><input id='input-"+j+"' name='input-"+j+"' type='number' onkeyup='updateValues()' onchange='updateValues()' value='0' min='0' max='10'/></td>"
                text += "</tr>";
            }
        }
    }
    text += "</table>";
    $("#charges").html(text);
}

function reset() {
    $(':input').val('0');
    $("#max-fine-amount").html("0");
    $("#max-jail-time").html("0");
    $("#charge-text").html("");
}

function updateValues() {
    console.log("updating...");
    fineAmount = 0;
    jailTime = 0;
    chargeText = "";
    $(":input").each(function() {
        if ($(this).val() > 0) {
            chargeId = $(this).attr('id').split("-")[1];
            fineAmount += charges[chargeId]["fine_amount"] * $(this).val();
            jailTime += charges[chargeId]["jail_time"] * $(this).val();
            chargeText += charges[chargeId]["offense_name"];
            if ($(this).val() > 1) {
                chargeText += " (x"+$(this).val()+")";
            }
            chargeText += ", ";
        }
    });
    chargeText = chargeText.slice(0, -2);
    $("#max-fine-amount").html(fineAmount);
    $("#max-jail-time").html(jailTime);
    $("#charge-text").html(chargeText);
}

function showDescription(id) {
    $("#description").html(charges[id]["description"]);
    $("#dialog").fadeIn('slow');
    return false;
}
