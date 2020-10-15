OBS Log Viewer Widget
----------------
![Release](https://github.com/mrgoodbytes8667/obslogviewer/workflows/Release/badge.svg) ![Dev](https://github.com/mrgoodbytes8667/obslogviewer/workflows/Dev/badge.svg)

A simple (dockable) widget for OBS that can be used for logging information via OBS Websocket

## Pre-requisites
- [OBS Websocket Plugin](https://github.com/Palakis/obs-websocket/releases)

### Optional
- [Kruiz Control](https://github.com/Kruiser8/Kruiz-Control)

## Setup and Usage
- Download the latest release from the release page, and extract
- Modify the connection information in index.html for OBS Websocket and the realm in build/connection.js if not using Kruiz Control
- Add the widget to OBS as a dock
- Use Kruiz Control or any other mechanism to send a custom message via OBS Websocket. The message should be `OBSLogWidgetListener`, the data will be displayed in the log.
  - If not using Kruiz Control, the realm will need to be manually changed on line one in build/connection.js
- As messages come in, you can click on the X on the right of each one to close it
- Refresh button at the bottom will reload the page. Entries do not persist past a refresh!

### Kruiz Control Example
```
OnCommand e 0 !log
OBS Send "OBSLogWidgetListener" "Oh hi I am some output"
```

## Thanks
This widget uses the [Kruiz Control Widget](https://github.com/Kruiser8/Kruiz-Control-Widget) template by [Kruiser8](https://github.com/Kruiser8).