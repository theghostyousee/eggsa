const web3 = new Web3(
    Web3.givenProvider ||
      "https://mainnet.infura.io/v3/8720d142d8a841148b0fd3aa98e3c7e1"
);


const connectButton = document.getElementById("connect-btn");
const balancetext = document.getElementById("balance")
connectButton.addEventListener("click", () => {
    onClickConnect();
});


const onClickConnect = async () => {
    try {
      let network = await ethereum.networkVersion;
      let accounts = await ethereum.request({ method: "eth_accounts" });
  
      if (network === "324") {
        await ethereum.request({ method: "eth_requestAccounts" });
        let accounts = await ethereum.request({ method: "eth_accounts" });
        connectButton.textContent =
          shortAddress(accounts[0]) || "Not able to get accounts";
  
          const balance = await web3.eth.getBalance(accounts[0]);
          const balanceInBNB = balance / 10 ** 18;
          const roundedBalance = balanceInBNB.toFixed(4);

          balancetext.textContent = `ETH: ${roundedBalance}`
      } else {
        console.error(
          `Error: Connected to unsupported network with ID: ${network}`
        );
        connectButton.textContent = "Wrong Network";
      }
    } catch (error) {
      console.error(error);
    }
  };
  
function shortAddress(address) {
    return address.slice(0, 6) + "..." + address.slice(-5, address.length);
}




const BuyInput = document.getElementById("buy-placeholder");
const MAX = document.getElementById("max")

MAX.addEventListener("click", async () => {

    await ethereum.request({ method: "eth_requestAccounts" });
    let accounts = await ethereum.request({ method: "eth_accounts" });
    
    const balance = await web3.eth.getBalance(accounts[0]);
    const balanceInETH = balance / 10 ** 18;
    const roundedBalance = balanceInETH.toFixed(4);
    console.log(balanceInETH)
    BuyInput.value = roundedBalance;
    console.log(BuyInput.value)
});

function updateTimer() {
    const now = new Date();
    const target = new Date();
    target.setUTCHours(19, 0, 0); // Set target time to 2 PM EST
    let diff = target - now;
    if (diff < 0) {
      diff += 24 * 60 * 60 * 1000; // Add a day to the difference if the target time has already passed
    }
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const formattedSeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const formattedHours = (hours < 10) ? `0${hours}` : hours;
    const timer = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    document.getElementById("timer").innerHTML = timer; // Update the timer display
}
  
setInterval(updateTimer, 1000); // Update the timer every second
  