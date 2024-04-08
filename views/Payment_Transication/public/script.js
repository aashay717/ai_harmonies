function updateAmount() {
    var subscription = document.getElementById("subscription").value;
    var amountInput = document.getElementById("Amount");
    var payButton = document.querySelector(".buy-button");

    if (subscription === "monthly") {
        amountInput.value = "29/-";
        payButton.textContent = "Pay 29/-";
    } else if (subscription === "annual") {
        amountInput.value = "300/-";
        payButton.textContent = "Pay 300/-";
    }
}


