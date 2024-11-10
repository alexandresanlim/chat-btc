<h1 align='center'> ChatBTC (Beta) </h1>
<p align='center'> A "ChatGPT" for bitcoiners </p>

<p align='center'> 
  <img width='200' src='https://github.com/alexandresanlim/chat-btc/blob/master/assets/images/logo/orange.png?raw=true' />
 </p>
 
 <p align='center'> 
  <a href='https://play.google.com/store/apps/details?id=io.github.aichatbtc'><img src="https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white" /></a>
  <!--<a href='https://install.appcenter.ms/users/alexandre.sanlim/apps/pix-off/distribution_groups/public'><img src="https://img.shields.io/badge/Android_Apk-3DDC84?style=for-the-badge&logo=android&logoColor=white" /></a>-->
</p>
    
<p align='center'>
  <img width="250" src="https://github.com/alexandresanlim/chat-btc/blob/master/assets/images/store/google-play/1.png?raw=true"/> <img width="250" src="https://github.com/alexandresanlim/chat-btc/blob/master/assets/images/store/google-play/2.png?raw=true"/>  <img width="250" src="https://github.com/alexandresanlim/chat-btc/blob/master/assets/images/store/google-play/3.png?raw=true"/> 
 </p>
  
# Contribute

- [🤖 Bots](#-bots)
- [Commands](#commands)
  - [Create](#commands)
  - [Create with parameter](#create-with-parameter-)
  - [Get data](#get-data-)
  - [Format data](#format-data-)
  - [Set on quich type or auto complete](#set-on-quick-type-or-auto-complete-)



## 🤖 Bots
<p>
  You can see all it <a href='https://github.com/alexandresanlim/chat-btc/tree/master/services/bots'>here</a>
</p>

To create new one, follow this template:
```json
{
  "id": "mempool",
  "name": "Mempool",
  "avatar": "https://freeter.io/web-apps/bitcoin/mempool-space/mempool-space.png"
}
```
and put on [services/bots](https://github.com/alexandresanlim/chat-btc/tree/master/services/bots) path

## Commands

### Create [🔝](#contribute)
To create new one, follow this template:
```json
{
  "url": "https://mempool.space/api/v1/difficulty-adjustment",
  "botId": "mempool",
  "answer": {
    "success": "Follow Bitcoin difficulty adjustment information:\n\n• Progress percent: [progressPercent:percent]\n• Difficulty change: [difficultyChange:decimal]\n• Estimated retarget date: [estimatedRetargetDate:date]\n• Remaining blocks: [remainingBlocks]\n• Remaining time: [remainingTime:time]\n• Previous retarget: [previousRetarget:decimal]\n• Previous time: [previousTime:time]\n• NextRetarget height: [nextRetargetHeight]\n• Time avg: [timeAvg:time]\n• Adjusted time avg: [adjustedTimeAvg:time]\n• Expected blocks: [expectedBlocks:decimal]",
    "error": "😞 No one Bitcoin adjustment was found, please try again"
  }
}
```
and put on [services/commands](https://github.com/alexandresanlim/chat-btc/tree/master/services/commands) path

⚠️ <b>The file name is the command sent by user to invoke this command</b>

### Create with parameter [🔝](#contribute)

When url require a paramter as bellow example, you can set `{0}` on url and define a parameter default as `"default": "Bitcoin"`. It Represente the secondary word type sent by user.

```json
{
  "url": "https://api.coincap.io/v2/assets/{0}",
  "botId": "coincap",
  "parameters": {
    "default": "Bitcoin"
  },
  "answer": {
    "success": "The current price of [data.name] ([data.symbol]) is [data.priceUsd:currency], over the past 24 hours, it has changed by [data.changePercent24Hr:percent]",
    "error": "😞 No one Bitcoin price was found, please try again"
  }
}
```
### Get data [🔝](#contribute)
It's representate by betwen `[]` character with path to get data from api return.

### Format data [🔝](#contribute)
You can format data following `[pathData:{format}]`. We support:</br></br>
Percent: `[pathData:percent]`</br>
Decimal: `[pathData:decimal]`</br>
Date: `[pathData:date]`</br>
Time: `[pathData:time]`</br>
Currency: `[pathData:currency]`</br>

### Set on quick type or auto complete [🔝](#contribute)

To it follow this template:

```json
{
    "title": "Price",
    "value": "Price",
    "autoComplete": ["Bitcoin", "Ethereum", "Solana"]
},
```
and set on this [file](https://github.com/alexandresanlim/chat-btc/blob/master/services/commands/commandList/list_us.json).

- auto complete is optional

## ToDo

[] Create unit test
[] Optin to create and manager Bitcoin wallets
[] P2P community
[] Option to set real IA as ChatGPT


