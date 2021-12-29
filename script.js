(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.playAudioList([this.audio_FC3DFAB0_CA69_E9B1_41D2_994A55742E31]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "paddingLeft": 0,
 "vrPolyfillScale": 1,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "mobileMipmappingEnabled": false,
 "backgroundPreloadEnabled": true,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MainViewer",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_4041C033_7558_FB6E_41CE_BFE427F3AF92",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9"
 ],
 "minWidth": 20,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "defaultVRPointer": "laser",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "scripts": {
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "existsKey": function(key){  return key in window; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "registerKey": function(key, value){  window[key] = value; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "unregisterKey": function(key){  delete window[key]; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "downloadEnabled": true,
 "gap": 10,
 "height": "100%",
 "minHeight": 20,
 "paddingTop": 0,
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "class": "Player",
 "paddingBottom": 0,
 "borderRadius": 0,
 "data": {
  "name": "Player468"
 },
 "overflow": "visible",
 "definitions": [{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Acesso as su\u00edtes",
 "id": "panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A",
 "thumbnailUrl": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_FDEB09AE_8E04_1C08_41C2_5273787373D0",
  "this.overlay_FCABDCCB_8E04_1408_41E1_909ABB2EA654"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09DD8B1A_0779_E673_4166_266F1824DF48"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Corredor lateral ",
 "id": "panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC",
 "thumbnailUrl": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AF507D36_A44A_1A22_41C6_5B34EB45BF3D"
 ]
},
{
 "items": [
  "this.PanoramaPlayListItem_09358907_0779_E251_4198_F91D181D02EC",
  {
   "media": "this.panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_camera"
  },
  "this.PanoramaPlayListItem_0934C908_0779_E25F_4198_B778B6152801",
  {
   "media": "this.panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_camera"
  },
  {
   "media": "this.panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_camera"
  },
  {
   "media": "this.panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_camera"
  },
  {
   "media": "this.panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_camera"
  },
  {
   "media": "this.panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_camera"
  },
  {
   "media": "this.panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_camera"
  },
  {
   "media": "this.panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_camera"
  },
  {
   "media": "this.panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_camera"
  },
  {
   "media": "this.panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_camera"
  },
  {
   "media": "this.panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_camera"
  },
  {
   "media": "this.panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_camera"
  },
  {
   "media": "this.panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_camera"
  },
  {
   "media": "this.panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_camera"
  },
  {
   "media": "this.panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_camera"
  },
  {
   "media": "this.panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_camera"
  },
  {
   "media": "this.panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_camera"
  },
  {
   "media": "this.panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_camera"
  },
  "this.PanoramaPlayListItem_09332908_0779_E25F_4162_6EBAE3D9DD7E",
  {
   "media": "this.panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_camera"
  },
  "this.PanoramaPlayListItem_0930D911_0779_E271_4199_F4AE25BABD25",
  "this.PanoramaPlayListItem_090F5912_0779_E273_4161_B34234B8FA6A",
  "this.PanoramaPlayListItem_090E1912_0779_E273_4188_854245743B86",
  "this.PanoramaPlayListItem_090D5913_0779_E271_419A_08B82A4F2A6D",
  {
   "media": "this.panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_camera"
  },
  "this.PanoramaPlayListItem_090DA913_0779_E271_419D_101039656052",
  {
   "media": "this.panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E",
   "camera": "this.panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Corredor lateral 3",
 "id": "panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C",
 "thumbnailUrl": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AF2B4703_A475_F7E2_41D1_DED02BA582B7",
  "this.overlay_AF5BAFDC_A476_F666_41DD_F0790C219BD4"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 170.45,
  "class": "PanoramaCameraPosition",
  "pitch": -8.08
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09C6A9A8_0779_E25F_4171_E30EBE286724"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09671A49_0779_E6D1_417E_EED5750A1F16"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 13.22,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_096D4A3E_0779_E6B3_4195_1D9FA3F4C5E3"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -169.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09216AAA_0779_E653_4171_10BB29010844"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_092BEA9C_0779_E677_4169_7267A1811271"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_0988D9E1_0779_E5D1_419C_3EF6CA0DE165"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Fachada 1",
 "id": "panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4",
 "thumbnailUrl": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_EBAB9D1D_8E7C_3408_41D6_6F79902F86D4"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_099AEB53_0779_E6F1_4199_7EACE576C465"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 34.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_0A921A33_0779_E6B2_416C_A4E5A99DE5A1"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 52.3,
   "backwardYaw": 2.85,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Sala de estar",
 "id": "panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D",
 "thumbnailUrl": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_FD97B990_8E05_FC18_41BA_1335DE47DA38",
  "this.overlay_FE0A724B_8E04_2C09_41CF_4D35E76E0619",
  "this.overlay_B19AA8B2_A44E_7A22_41D7_244DE815127B",
  "this.overlay_15F391D6_0612_2F9B_4154_31EEDD0A9A49"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09A1EB31_0779_E6B1_4196_61DCB6081DF2"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -169.71,
  "class": "PanoramaCameraPosition",
  "pitch": 2.2
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_090DEAC3_0779_E7D1_4190_2D732FEC4E40"
},
{
 "viewerArea": "this.MainViewer",
 "buttonCardboardView": "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "mouseControlMode": "drag_acceleration"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Banheiro su\u00edte master",
 "id": "panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA",
 "thumbnailUrl": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AF4CEFB5_A44A_3621_41E2_E2D5A57FDE4E"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Corredor fundos 2",
 "id": "panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC",
 "thumbnailUrl": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AF4E298A_A476_1AE3_41D3_CF2B33B3C075",
  "this.overlay_B14040C4_BE6F_A71E_41D1_70F750A1B8C2"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Su\u00edte 1",
 "id": "panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA",
 "thumbnailUrl": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_FA0ADD75_8E0C_3418_41D0_7FCC9C880757",
  "this.overlay_B1424100_BE55_A917_41E6_3603FE5B5600"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184"
  },
  {
   "yaw": 9.63,
   "backwardYaw": -145.4,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54",
   "distance": 1
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Cozinha",
 "id": "panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4",
 "thumbnailUrl": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_FA521EAD_8E7C_1408_41CB_24EC2741B6C0",
  "this.overlay_AF880FF6_BE7B_B8FB_41DB_EFE9DCE24093",
  "this.overlay_1456D36A_05EE_EC8B_4181_2E7624F58E0F"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 171.18,
  "class": "PanoramaCameraPosition",
  "pitch": -9.55
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09A519CB_0779_E5D1_419D_43BBC35A0366"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09366AB7_0779_E7B1_4196_3F9CA9BDC38A"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 154.29,
  "class": "PanoramaCameraPosition",
  "pitch": -17.63
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_086999F7_0779_E5B1_418E_717848C49E4B"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Lavanderia",
 "id": "panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D",
 "thumbnailUrl": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_94417CC2_9BDA_1A62_41C5_4CD86784C59A"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Vestiario externo",
 "id": "panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E",
 "thumbnailUrl": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_B0B1DCD0_A476_7A7E_41DB_29D0222AE023"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Garagem",
 "id": "panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184",
 "thumbnailUrl": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_FA826148_8E7F_EC08_41DC_932C1BC1E879",
  "this.overlay_B1F6BF77_BE55_99F9_41E2_A54949F4810E"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -159.43,
  "class": "PanoramaCameraPosition",
  "pitch": -4.41
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_099829EC_0779_E5D7_4198_4F4294909F91"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -145.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09012ACF_0779_E7D1_4185_1BC9346CDE2F"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -166.04,
  "class": "PanoramaCameraPosition",
  "pitch": -10.29
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_0A980A28_0779_E65E_4185_966F211206A8"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -162.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09F5EB02_0779_E653_418D_46DE94D93C66"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": -9.55
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09B6B9D6_0779_E5F3_4177_DED85673F806"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -79.35,
  "class": "PanoramaCameraPosition",
  "pitch": -0.73
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09F1899D_0779_E271_4194_8A7D2313D426"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09752A6B_0779_E6D1_4181_BB5371AD2FFE"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A"
  },
  {
   "yaw": 34.07,
   "backwardYaw": 143.71,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Acesso as su\u00edtes",
 "id": "panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB",
 "thumbnailUrl": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_E03C127E_8E04_2C08_41DF_13C48A085851",
  "this.overlay_AE512975_BE56_99F9_41E6_6BF44FFE3B27",
  "this.overlay_AEB29C33_BE56_9F79_41E1_4F72D14EBECB",
  "this.overlay_AF246539_BE56_E976_41E2_16D0757385F2",
  "this.overlay_AE64E1B5_BE56_6979_41CD_A59FDA36EF70"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 20.57,
  "class": "PanoramaCameraPosition",
  "pitch": -11.02
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_097CDA5F_0779_E6F1_4175_3424BE13911F"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Corredor fundos",
 "id": "panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1",
 "thumbnailUrl": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AF77642F_A476_2A22_41CF_D296D0838402",
  "this.overlay_B0EB1437_A476_2A22_41BE_26DCDD985242"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09FF2AF5_0779_E7B1_417E_9C65719C25D5"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 171.18,
  "class": "PanoramaCameraPosition",
  "pitch": -7.35
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09622A54_0779_E6F7_418E_56442FC92D63"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -36.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09878B48_0779_E6DF_4187_F4427EDFF9CE"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Su\u00edte Master",
 "id": "panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792",
 "thumbnailUrl": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AF3BCEBE_A44A_1622_41C0_1EEE8BB21009",
  "this.overlay_B08C576D_A44A_1626_41E0_2231AA97EDF2",
  "this.overlay_B15F95A3_BE6A_6919_41C7_981DF2BD0F00"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 1.47,
  "class": "PanoramaCameraPosition",
  "pitch": -19.1
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09DC09B4_0779_E5B7_4193_D4B21011990B"
},
{
 "hfovMin": "150%",
 "label": "Lavabo",
 "id": "panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294",
 "thumbnailUrl": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_FACB3EC8_8E04_F477_41B5_40E7294ABBE9"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_camera"
},
{
 "id": "audio_FC3DFAB0_CA69_E9B1_41D2_994A55742E31",
 "audio": {
  "mp3Url": "media/audio_FC3DFAB0_CA69_E9B1_41D2_994A55742E31.mp3",
  "oggUrl": "media/audio_FC3DFAB0_CA69_E9B1_41D2_994A55742E31.ogg",
  "class": "AudioResource"
 },
 "class": "MediaAudio",
 "data": {
  "label": "Alok - Alive (It Feels Like) [Official Video]"
 },
 "autoplay": true
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Closet su\u00edte master",
 "id": "panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27",
 "thumbnailUrl": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AF4C4D09_A44A_3BEE_41DE_D47990B6B872",
  "this.overlay_B08E4358_A44B_EE60_41A3_D8B841F53010"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Fachada 2",
 "id": "panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9",
 "thumbnailUrl": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_FAA0973D_8E7C_7408_4184_E0E80CC1A256",
  "this.overlay_FDF488AA_8E7D_FC08_41BC_F47F81EB2D70",
  "this.overlay_B1343C7A_BE55_BFEA_41B7_C369A6823E99"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -160.9,
  "class": "PanoramaCameraPosition",
  "pitch": -5.88
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09E43972_0779_E2B3_4186_0277C91C035D"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_0A9ECA1D_0779_E676_4183_5445DFE9D6B1"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Banheiro su\u00edte 2",
 "id": "panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F",
 "thumbnailUrl": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_B016864A_A44A_1662_41E1_E7F3A1396262"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -160.9,
  "class": "PanoramaCameraPosition",
  "pitch": -11.76
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_0836CBA2_0779_E652_4195_7683ED7EF2E5"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "\u00c1rea de lazer ",
 "id": "panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706",
 "thumbnailUrl": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_B0D01CBF_A44E_7A22_41E1_99CAEBE3CD61",
  "this.overlay_B13B9BB4_BE5B_997E_41DB_9DEAC328AA70"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -165.31,
  "class": "PanoramaCameraPosition",
  "pitch": -2.2
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_084FAB73_0779_E6B1_4183_27FDBDDBA72F"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -171.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_0817CBBA_0779_E5B3_4189_21B8E4F06B9E"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -145.4,
   "backwardYaw": 9.63,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "\u00c1rea Gourmet ",
 "id": "panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54",
 "thumbnailUrl": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_FB9BCF40_8E7C_3478_41DC_571FD37F71BA",
  "this.overlay_FD68B7DE_8E7C_340B_41D3_5FCC6A2F86D4",
  "this.overlay_17E3EB2A_05F2_FC8B_4170_1097DBC005B0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09153ADB_0779_E7F1_4192_0A18549168E9"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_08522B8A_0779_E652_419B_B675C4AB007C"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_camera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 143.71,
   "backwardYaw": 34.07,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Su\u00edte 2",
 "id": "panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7",
 "thumbnailUrl": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_B1CADB51_BE6B_9936_41CF_0103FF8F01F3",
  "this.overlay_AE069FD4_BE6A_B93E_41C6_CC3886410295"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_087CFB68_0779_E6DF_419C_ED208E95B921"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184"
  },
  {
   "yaw": 2.85,
   "backwardYaw": 52.3,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D",
   "distance": 1
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Cozinha",
 "id": "panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A",
 "thumbnailUrl": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_FD577AA5_8E04_1C38_41D4_B544BD613180",
  "this.overlay_B1F8E2B5_BE56_AB79_4182_839FE48DF07E"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Acesso as su\u00edtes",
 "id": "panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A",
 "thumbnailUrl": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_FD60CDD6_8E0C_1418_4194_AACCE646E3D6",
  "this.overlay_E0CD4E31_8E0D_F419_41A2_8635FE6E077A",
  "this.overlay_AF20BB89_BE6A_9929_41CC_48BB40A8E139",
  "this.overlay_B151A504_BE6B_A91E_41D8_02BBACF44D47"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Corredor lateral 3",
 "id": "panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B",
 "thumbnailUrl": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AF30D2A8_A44A_6E2E_41E1_7878A4C516B1",
  "this.overlay_AF1CF226_A476_6E23_41E1_EF7E3698AE5B"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -141.8,
  "class": "PanoramaCameraPosition",
  "pitch": 0.73
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_08233B96_0779_E672_4159_672BB4FFC034"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -130.78,
  "class": "PanoramaCameraPosition",
  "pitch": -5.88
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_095F7A83_0779_E651_4195_D8A59919BF38"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -177.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_0956CA90_0779_E64F_418D_B0EE0E0B4D9D"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Corredor lateral 2",
 "id": "panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278",
 "thumbnailUrl": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AF20B056_A44A_EA62_41D1_CF5F389884DD",
  "this.overlay_B16F6064_BE6E_A71F_41B4_DD6D6521BD13"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -160.16,
  "class": "PanoramaCameraPosition",
  "pitch": -7.35
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_08409B7E_0779_E6B3_4156_379A53EBFB8A"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -83.76,
  "class": "PanoramaCameraPosition",
  "pitch": -14.69
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09C99B0E_0779_E653_4198_935DB9FC314F"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": -4.41
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_086B2B5D_0779_E6F1_4196_36A29515DF4C"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Piscina",
 "id": "panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751",
 "thumbnailUrl": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_95E55970_BE6A_99F7_41BD_CD9D198E6066",
  "this.overlay_933D107F_BE7D_A7EA_4198_CBEB66098020"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09AE6B26_0779_E653_4189_2C0ED171AAA5"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_08064BAE_0779_E653_4196_10D9F787368B"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Banheiro Su\u00edte 1",
 "id": "panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E",
 "thumbnailUrl": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_FBB9F3CC_8E0C_EC08_41D9_E980F9988387"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09D1B9C0_0779_E5CF_4174_8F3C62590990"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -127.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09FB4988_0779_E25F_4179_FF128950BFC2"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -162.37,
  "class": "PanoramaCameraPosition",
  "pitch": -4.41
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09B46B3C_0779_E6B7_4176_1B626C38E989"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_094A4A77_0779_E6B1_4186_F760B0751AB9"
},
{
 "items": [
  {
   "media": "this.panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_camera"
  },
  {
   "media": "this.panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_camera"
  },
  {
   "media": "this.panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_camera"
  },
  {
   "media": "this.panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_camera"
  },
  {
   "media": "this.panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_camera"
  },
  {
   "media": "this.panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_camera"
  },
  {
   "media": "this.panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_camera"
  },
  {
   "media": "this.panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_camera"
  },
  {
   "media": "this.panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_camera"
  },
  {
   "media": "this.panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_camera"
  },
  {
   "media": "this.panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_camera"
  },
  {
   "media": "this.panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_camera"
  },
  {
   "media": "this.panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_camera"
  },
  {
   "media": "this.panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_camera"
  },
  {
   "media": "this.panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_camera"
  },
  {
   "media": "this.panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_camera"
  },
  {
   "media": "this.panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_camera"
  },
  {
   "media": "this.panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_camera"
  },
  {
   "media": "this.panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_camera"
  },
  {
   "media": "this.panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_camera"
  },
  {
   "media": "this.panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_camera"
  },
  {
   "media": "this.panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_camera"
  },
  {
   "media": "this.panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_camera"
  },
  {
   "media": "this.panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_camera"
  },
  {
   "media": "this.panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_camera"
  },
  {
   "media": "this.panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_camera"
  },
  {
   "media": "this.panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_camera"
  },
  {
   "media": "this.panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 27, 28)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_camera"
  },
  {
   "media": "this.panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 28, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_camera"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -170.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_09EB1AE9_0779_E7D1_4144_244137FB9B89"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751"
  }
 ],
 "hfovMin": "150%",
 "hfov": 360,
 "label": "Corredor fundos 3",
 "id": "panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6",
 "thumbnailUrl": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_B1B78E9A_BE6B_9B2A_41DA_21816CF70E99",
  "this.overlay_B1454F3D_BE6B_9969_41D1_C39287A6D85E"
 ]
},
{
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "left": 0,
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "minWidth": 100,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 0.5,
 "toolTipFontSize": 13,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "paddingRight": 0,
 "toolTipPaddingBottom": 7,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "shadow": false,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "class": "ViewerArea",
 "toolTipShadowOpacity": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "paddingLeft": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 7,
 "minHeight": 50,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingLeft": 10,
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 10,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "layout": "absolute",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "right": "0%",
 "width": 115.05,
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "height": 641,
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "-- SETTINGS"
 },
 "overflow": "scroll"
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "Container_4041C033_7558_FB6E_41CE_BFE427F3AF92",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "left": "0%",
 "width": 330,
 "children": [
  "this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4",
  "this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "height": "100%",
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "--- LEFT PANEL 4 (Community)"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--INFO photo"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--LOCATION"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--FLOORPLAN"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--PHOTOALBUM"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9",
 "left": "0%",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#04A3E1",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_1E19923C_57F1_802D_41C4_18DBE75E48C1",
  "this.Container_1E18A23C_57F1_802D_41B9_D08FA26C7F4C"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--REALTOR"
 },
 "overflow": "scroll"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "paddingLeft": 0,
 "width": 58,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "maxWidth": 58,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "paddingRight": 0,
 "mode": "toggle",
 "shadow": false,
 "height": 58,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "maxHeight": 58,
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "paddingLeft": 0,
 "width": 58,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "maxWidth": 58,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "paddingRight": 0,
 "mode": "toggle",
 "shadow": false,
 "height": 58,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "maxHeight": 58,
 "data": {
  "name": "IconButton MUTE"
 },
 "cursor": "hand"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.97,
   "pitch": -10.3,
   "yaw": 2.49,
   "image": "this.AnimatedImageResource_A720F307_BEAA_6919_41DB_C49BBC80AA54",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_FDEB09AE_8E04_1C08_41C2_5273787373D0",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.97,
   "yaw": 2.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.78,
   "pitch": -10.66,
   "yaw": 26.56,
   "image": "this.AnimatedImageResource_A7203307_BEAA_6919_41DA_84C71FE8E6FF",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_FCABDCCB_8E04_1408_41E1_909ABB2EA654",
 "data": {
  "label": "Arrow 02 Right"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 15.78,
   "yaw": 26.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.07,
   "pitch": -20.3,
   "yaw": 2.49,
   "image": "this.AnimatedImageResource_A725C30F_BEAA_6929_41E2_CE634C4CE191",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278, this.camera_09A1EB31_0779_E6B1_4196_61DCB6081DF2); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AF507D36_A44A_1A22_41C6_5B34EB45BF3D",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 15.07,
   "yaw": 2.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "media": "this.panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_camera",
 "id": "PanoramaPlayListItem_09358907_0779_E251_4198_F91D181D02EC"
},
{
 "media": "this.panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_camera",
 "id": "PanoramaPlayListItem_0934C908_0779_E25F_4198_B778B6152801"
},
{
 "media": "this.panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_camera",
 "id": "PanoramaPlayListItem_09332908_0779_E25F_4162_6EBAE3D9DD7E"
},
{
 "media": "this.panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_camera",
 "id": "PanoramaPlayListItem_0930D911_0779_E271_4199_F4AE25BABD25"
},
{
 "media": "this.panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_camera",
 "id": "PanoramaPlayListItem_090F5912_0779_E273_4161_B34234B8FA6A"
},
{
 "media": "this.panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_camera",
 "id": "PanoramaPlayListItem_090E1912_0779_E273_4188_854245743B86"
},
{
 "media": "this.panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_camera",
 "id": "PanoramaPlayListItem_090D5913_0779_E271_419A_08B82A4F2A6D"
},
{
 "media": "this.panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_camera",
 "id": "PanoramaPlayListItem_090DA913_0779_E271_419D_101039656052"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.69,
   "pitch": -12.47,
   "yaw": 0.09,
   "image": "this.AnimatedImageResource_A7261310_BEAA_6937_41C7_0936F9D7593B",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1, this.camera_08064BAE_0779_E653_4196_10D9F787368B); this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AF2B4703_A475_F7E2_41D1_DED02BA582B7",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 15.69,
   "yaw": 0.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.16,
   "pitch": -10.35,
   "yaw": 171.68,
   "image": "this.AnimatedImageResource_A7266310_BEAA_6937_41DD_6FAFB9198120",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B, this.camera_0817CBBA_0779_E5B3_4189_21B8E4F06B9E); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AF5BAFDC_A476_F666_41DD_F0790C219BD4",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.16,
   "yaw": 171.68,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.83,
   "pitch": -4.77,
   "yaw": -13.91,
   "image": "this.AnimatedImageResource_A71AF2FF_BEAA_68E9_41E5_D09F8255EE7E",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9, this.camera_09752A6B_0779_E6D1_4181_BB5371AD2FFE); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_EBAB9D1D_8E7C_3408_41D6_6F79902F86D4",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 16.83,
   "yaw": -13.91,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 21.79,
   "pitch": -3.71,
   "yaw": 30.36,
   "image": "this.AnimatedImageResource_A5EEF86B_BEAA_A7EA_41E0_32C2F7CC48E1",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_FD97B990_8E05_FC18_41BA_1335DE47DA38",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.79,
   "yaw": 30.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.99,
   "pitch": -5.3,
   "yaw": 52.3,
   "image": "this.AnimatedImageResource_8B96BE95_9BD6_16E6_41D3_A091D8AC52B5",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A, this.camera_0956CA90_0779_E64F_418D_B0EE0E0B4D9D); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_FE0A724B_8E04_2C09_41CF_4D35E76E0619",
 "data": {
  "label": "Arrow 02 Right"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 15.99,
   "yaw": 52.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 20.71,
   "pitch": -2.71,
   "yaw": -18.63,
   "image": "this.AnimatedImageResource_A5F1786B_BEAA_A7EA_41DE_BD710DFDA482",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278, this.camera_092BEA9C_0779_E677_4169_7267A1811271); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B19AA8B2_A44E_7A22_41D7_244DE815127B",
 "data": {
  "label": "Arrow 02 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 20.71,
   "yaw": -18.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.12,
   "pitch": -7.4,
   "yaw": 157.35,
   "image": "this.AnimatedImageResource_14DDCB50_0612_5C97_418A_6FFB8A806540",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9, this.camera_09216AAA_0779_E653_4171_10BB29010844); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_15F391D6_0612_2F9B_4154_31EEDD0A9A49",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.12,
   "yaw": 157.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0_HS_3_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "paddingLeft": 0,
 "width": 58,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "maxWidth": 58,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "height": 58,
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "maxHeight": 58,
 "data": {
  "name": "IconButton VR"
 },
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "paddingLeft": 0,
 "width": 58,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "maxWidth": 58,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "paddingRight": 0,
 "mode": "toggle",
 "shadow": false,
 "height": 58,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "maxHeight": 58,
 "data": {
  "name": "IconButton HS "
 },
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "paddingLeft": 0,
 "width": 58,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "maxWidth": 58,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "paddingRight": 0,
 "mode": "toggle",
 "shadow": false,
 "height": 58,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "maxHeight": 58,
 "data": {
  "name": "IconButton GYRO"
 },
 "cursor": "hand"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.68,
   "pitch": -11.86,
   "yaw": -163.81,
   "image": "this.AnimatedImageResource_A725830F_BEAA_6929_41D1_7E549A9C938D",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AF4CEFB5_A44A_3621_41E2_E2D5A57FDE4E",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.68,
   "yaw": -163.81,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.19,
   "pitch": -18.1,
   "yaw": 3.87,
   "image": "this.AnimatedImageResource_A71C8D3C_BE56_B96E_41E4_377D62B960F4",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6, this.camera_097CDA5F_0779_E6F1_4175_3424BE13911F); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AF4E298A_A476_1AE3_41D3_CF2B33B3C075",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.19,
   "yaw": 3.87,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -18.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.56,
   "pitch": -14.33,
   "yaw": 174.43,
   "image": "this.AnimatedImageResource_A71D7D3C_BE56_B96E_41D3_BA2A7CEE4DAF",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B14040C4_BE6F_A71E_41D1_70F750A1B8C2",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.56,
   "yaw": 174.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.39,
   "pitch": -17.26,
   "yaw": 82.78,
   "image": "this.AnimatedImageResource_A722C308_BEAA_6917_41E3_04EF9A168AF1",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E, this.camera_09F1899D_0779_E271_4194_8A7D2313D426); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_FA0ADD75_8E0C_3418_41D0_7FCC9C880757",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 16.39,
   "yaw": 82.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.58,
   "pitch": -18.09,
   "yaw": 119.98,
   "image": "this.AnimatedImageResource_A7223308_BEAA_6917_41E6_6ECC25333253",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B1424100_BE55_A917_41E6_3603FE5B5600",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 16.58,
   "yaw": 119.98,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -18.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.72,
   "pitch": -9.99,
   "yaw": 9.63,
   "image": "this.AnimatedImageResource_A71C6306_BEAA_691B_41AB_576E365F3B27",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54, this.camera_0A921A33_0779_E6B2_416C_A4E5A99DE5A1); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_FA521EAD_8E7C_1408_41CB_24EC2741B6C0",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.72,
   "yaw": 9.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.79,
   "pitch": -10.12,
   "yaw": 163.93,
   "image": "this.AnimatedImageResource_A71DB306_BEAA_691B_41C0_069E86ABE918",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184, this.camera_0A980A28_0779_E65E_4185_966F211206A8); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AF880FF6_BE7B_B8FB_41DB_EFE9DCE24093",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.79,
   "yaw": 163.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.2,
   "pitch": -3.83,
   "yaw": -83.56,
   "image": "this.AnimatedImageResource_141B374F_05ED_D48A_418B_EE539DAC76B7",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1456D36A_05EE_EC8B_4181_2E7624F58E0F",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.2,
   "yaw": -83.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0_HS_2_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.28,
   "pitch": -13.66,
   "yaw": 157.49,
   "image": "this.AnimatedImageResource_A71D0306_BEAA_691B_41B0_E995AEAE1748",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54, this.camera_09B6B9D6_0779_E5F3_4177_DED85673F806); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_94417CC2_9BDA_1A62_41C5_4CD86784C59A",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.28,
   "yaw": 157.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.66,
   "pitch": -17.76,
   "yaw": 126.93,
   "image": "this.AnimatedImageResource_A7284311_BEAA_6939_41E5_1F6DBC231499",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751, this.camera_096D4A3E_0779_E6B3_4195_1D9FA3F4C5E3); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B0B1DCD0_A476_7A7E_41DB_29D0222AE023",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.66,
   "yaw": 126.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.86,
   "pitch": -8.89,
   "yaw": 36.95,
   "image": "this.AnimatedImageResource_A71CE305_BEAA_6919_41D7_DA50E203C735",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4, this.camera_09366AB7_0779_E7B1_4196_3F9CA9BDC38A); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_FA826148_8E7F_EC08_41DC_932C1BC1E879",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.86,
   "yaw": 36.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.07,
   "pitch": -11.79,
   "yaw": -164.69,
   "image": "this.AnimatedImageResource_A71C1305_BEAA_6919_41BD_FF08B108D0B4",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9, this.camera_090DEAC3_0779_E7D1_4190_2D732FEC4E40); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B1F6BF77_BE55_99F9_41E2_A54949F4810E",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.07,
   "yaw": -164.69,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.46,
   "pitch": -15.82,
   "yaw": -113.38,
   "image": "this.AnimatedImageResource_A721C308_BEAA_6917_41C1_590706A59F6D",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A, this.camera_09B46B3C_0779_E6B7_4176_1B626C38E989); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E03C127E_8E04_2C08_41DF_13C48A085851",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 15.46,
   "yaw": -113.38,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.55,
   "pitch": -16.11,
   "yaw": -61.67,
   "image": "this.AnimatedImageResource_A712ED2A_BE56_B96A_41E0_1A3AFEC5187F",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AE512975_BE56_99F9_41E6_6BF44FFE3B27",
 "maps": [
  {
   "hfov": 17.55,
   "yaw": -61.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0_HS_2_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.55,
   "pitch": -16.11,
   "yaw": -61.67,
   "image": "this.AnimatedImageResource_A7128D2B_BE56_B96A_41D7_8A3BF1DE8583",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AEB29C33_BE56_9F79_41E1_4F72D14EBECB",
 "maps": [
  {
   "hfov": 17.55,
   "yaw": -61.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0_HS_3_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.55,
   "pitch": -16.11,
   "yaw": -61.67,
   "image": "this.AnimatedImageResource_A7137D2B_BE56_B96A_41C5_48691F7C7EF3",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA, this.camera_099AEB53_0779_E6F1_4199_7EACE576C465); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AF246539_BE56_E976_41E2_16D0757385F2",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.55,
   "yaw": -61.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0_HS_4_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.47,
   "pitch": -13.81,
   "yaw": 34.07,
   "image": "this.AnimatedImageResource_A7229308_BEAA_6917_41E0_5B189DE75BB2",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7, this.camera_09878B48_0779_E6DF_4187_F4427EDFF9CE); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AE64E1B5_BE56_6979_41CD_A59FDA36EF70",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.47,
   "yaw": 34.07,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0_HS_5_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 13.99,
   "pitch": -13.98,
   "yaw": 134.82,
   "image": "this.AnimatedImageResource_A7279310_BEAA_6937_41B6_DF8620F4173F",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C, this.camera_09A519CB_0779_E5D1_419D_43BBC35A0366); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AF77642F_A476_2A22_41CF_D296D0838402",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 13.99,
   "yaw": 134.82,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.82,
   "pitch": -7.81,
   "yaw": 4.83,
   "image": "this.AnimatedImageResource_A727D310_BEAA_6937_41E5_858786AEF9F3",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC, this.camera_09D1B9C0_0779_E5CF_4174_8F3C62590990); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B0EB1437_A476_2A22_41BE_26DCDD985242",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.82,
   "yaw": 4.83,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.59,
   "pitch": -6.98,
   "yaw": -137.05,
   "image": "this.AnimatedImageResource_A725830E_BEAA_692B_41C0_B6629FAC7C6C",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AF3BCEBE_A44A_1622_41C0_1EEE8BB21009",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.59,
   "yaw": -137.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.03,
   "pitch": -12.54,
   "yaw": -3.68,
   "image": "this.AnimatedImageResource_A723530F_BEAA_6929_41E0_3B8AD31C9A64",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B08C576D_A44A_1626_41E0_2231AA97EDF2",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.03,
   "yaw": -3.68,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.83,
   "pitch": -12.47,
   "yaw": 54.04,
   "image": "this.AnimatedImageResource_A724A30F_BEAA_6929_41CE_CB22B0108AFC",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B15F95A3_BE6A_6919_41C7_981DF2BD0F00",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.83,
   "yaw": 54.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0_HS_2_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.78,
   "pitch": -18.67,
   "yaw": -89.6,
   "image": "this.AnimatedImageResource_A7218307_BEAA_6919_41B5_015F1D19DE5F",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_FACB3EC8_8E04_F477_41B5_40E7294ABBE9",
 "maps": [
  {
   "hfov": 16.78,
   "yaw": -89.6,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -18.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 14.08,
   "pitch": -12.47,
   "yaw": -115.7,
   "image": "this.AnimatedImageResource_A724E30F_BEAA_6929_41B3_ABEC4774249E",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792, this.camera_099829EC_0779_E5D7_4198_4F4294909F91); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AF4C4D09_A44A_3BEE_41DE_D47990B6B872",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 14.08,
   "yaw": -115.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 14.87,
   "pitch": -12.68,
   "yaw": -4.1,
   "image": "this.AnimatedImageResource_A724230F_BEAA_6929_41D3_ECCD7A9A6E62",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA, this.camera_0988D9E1_0779_E5D1_419C_3EF6CA0DE165); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B08E4358_A44B_EE60_41A3_D8B841F53010",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 14.87,
   "yaw": -4.1,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 23.32,
   "pitch": -6.69,
   "yaw": 48.07,
   "image": "this.AnimatedImageResource_A71BE304_BEAA_691F_41A8_5522D754D4AC",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184, this.camera_087CFB68_0779_E6DF_419C_ED208E95B921); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_FAA0973D_8E7C_7408_4184_E0E80CC1A256",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 23.32,
   "yaw": 48.07,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.34,
   "pitch": -6.28,
   "yaw": -3.34,
   "image": "this.AnimatedImageResource_A71B3305_BEAA_6919_41E0_DFB0E8DA0D01",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D, this.camera_086B2B5D_0779_E6F1_4196_36A29515DF4C); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_FDF488AA_8E7D_FC08_41BC_F47F81EB2D70",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.34,
   "yaw": -3.34,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 14.23,
   "pitch": -9.45,
   "yaw": -168.76,
   "image": "this.AnimatedImageResource_A71C8305_BEAA_6919_41D3_81373E4DFF84",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4, this.camera_084FAB73_0779_E6B1_4183_27FDBDDBA72F); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B1343C7A_BE55_BFEA_41B7_C369A6823E99",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 14.23,
   "yaw": -168.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0_HS_2_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.56,
   "pitch": -10.83,
   "yaw": -120.35,
   "image": "this.AnimatedImageResource_A724430E_BEAA_692B_41B6_1050967C42C5",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7, this.camera_0836CBA2_0779_E652_4195_7683ED7EF2E5); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B016864A_A44A_1662_41E1_E7F3A1396262",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.56,
   "yaw": -120.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 20.26,
   "pitch": -12.3,
   "yaw": -159.75,
   "image": "this.AnimatedImageResource_A71E2306_BEAA_691B_41CE_2F95A0BE7F11",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54, this.camera_095F7A83_0779_E651_4195_D8A59919BF38); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B0D01CBF_A44E_7A22_41E1_99CAEBE3CD61",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 20.26,
   "yaw": -159.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.38,
   "pitch": -8.01,
   "yaw": -29.15,
   "image": "this.AnimatedImageResource_A71E7306_BEAA_691B_41DC_E983545D8E35",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E, this.camera_094A4A77_0779_E6B1_4186_F760B0751AB9); this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B13B9BB4_BE5B_997E_41DB_9DEAC328AA70",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.38,
   "yaw": -29.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.04,
   "pitch": -13.28,
   "yaw": -3.48,
   "image": "this.AnimatedImageResource_A71D5306_BEAA_691B_41E6_9F1319B38577",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706, this.camera_09FF2AF5_0779_E7B1_417E_9C65719C25D5); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_FB9BCF40_8E7C_3478_41DC_571FD37F71BA",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.04,
   "yaw": -3.48,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.34,
   "pitch": -8.43,
   "yaw": -35.02,
   "image": "this.AnimatedImageResource_A71EC306_BEAA_691B_41E6_3A06F451EE7F",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_FD68B7DE_8E7C_340B_41D3_5FCC6A2F86D4",
 "data": {
  "label": "Arrow 02 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 15.34,
   "yaw": -35.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.17,
   "pitch": -5.47,
   "yaw": -145.4,
   "image": "this.AnimatedImageResource_1179A185_05EE_EC79_418A_44484AD2395D",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4, this.camera_09EB1AE9_0779_E7D1_4144_244137FB9B89); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_17E3EB2A_05F2_FC8B_4170_1097DBC005B0",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.17,
   "yaw": -145.4,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0_HS_2_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.88,
   "pitch": -13.66,
   "yaw": 26.89,
   "image": "this.AnimatedImageResource_A724B30E_BEAA_692B_41DB_4E6826E5B8E5",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F, this.camera_09153ADB_0779_E7F1_4192_0A18549168E9); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B1CADB51_BE6B_9936_41CF_0103FF8F01F3",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 15.88,
   "yaw": 26.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.81,
   "pitch": -13.73,
   "yaw": 143.71,
   "image": "this.AnimatedImageResource_A724130E_BEAA_692B_41E6_C635EEF9DB25",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB, this.camera_09012ACF_0779_E7D1_4185_1BC9346CDE2F); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AE069FD4_BE6A_B93E_41C6_CC3886410295",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.81,
   "yaw": 143.71,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 26.89,
   "pitch": -23.15,
   "yaw": 2.85,
   "image": "this.AnimatedImageResource_8B971E95_9BD6_16E6_41D3_2970934EF476",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D, this.camera_09FB4988_0779_E25F_4179_FF128950BFC2); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_FD577AA5_8E04_1C38_41D4_B544BD613180",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 26.89,
   "yaw": 2.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.72,
   "pitch": -5.73,
   "yaw": -147.74,
   "image": "this.AnimatedImageResource_A714ED27_BE56_B91A_41B9_7200915BB6E8",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184, this.camera_09E43972_0779_E2B3_4186_0277C91C035D); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B1F8E2B5_BE56_AB79_4182_839FE48DF07E",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.72,
   "yaw": -147.74,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.06,
   "pitch": -18.91,
   "yaw": 83.74,
   "image": "this.AnimatedImageResource_A723A30D_BEAA_6929_41BD_85551A3DA113",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792, this.camera_09AE6B26_0779_E653_4189_2C0ED171AAA5); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_FD60CDD6_8E0C_1418_4194_AACCE646E3D6",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.06,
   "yaw": 83.74,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -18.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 21.12,
   "pitch": -19.32,
   "yaw": -78.49,
   "image": "this.AnimatedImageResource_A723E30E_BEAA_692B_41E0_581703B9AA0F",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7, this.camera_09C99B0E_0779_E653_4198_935DB9FC314F); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_E0CD4E31_8E0D_F419_41A2_8635FE6E077A",
 "data": {
  "label": "Arrow 02 Right-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 21.12,
   "yaw": -78.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.25,
   "pitch": -21.31,
   "yaw": -174.13,
   "image": "this.AnimatedImageResource_A723430E_BEAA_692B_41D4_F05F550FED40",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA, this.camera_09DD8B1A_0779_E673_4166_266F1824DF48); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AF20BB89_BE6A_9929_41CC_48BB40A8E139",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 16.25,
   "yaw": -174.13,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0_HS_3_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.58,
   "pitch": -13.21,
   "yaw": 154.09,
   "image": "this.AnimatedImageResource_A723730E_BEAA_692B_41E2_1F96F909E5AC",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A, this.camera_09F5EB02_0779_E653_418D_46DE94D93C66); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B151A504_BE6B_A91E_41D8_02BBACF44D47",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 18.58,
   "yaw": 154.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0_HS_4_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.09,
   "pitch": -8.15,
   "yaw": 3.45,
   "image": "this.AnimatedImageResource_A726930F_BEAA_6929_41C4_4F66004F430E",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C, this.camera_09671A49_0779_E6D1_417E_EED5750A1F16); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AF30D2A8_A44A_6E2E_41E1_7878A4C516B1",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 15.09,
   "yaw": 3.45,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.63,
   "pitch": -17,
   "yaw": -172.39,
   "image": "this.AnimatedImageResource_A726C310_BEAA_6937_41C1_FD35313FBD1A",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278, this.camera_09622A54_0779_E6F7_418E_56442FC92D63); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AF1CF226_A476_6E23_41E1_EF7E3698AE5B",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 15.63,
   "yaw": -172.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 14.48,
   "pitch": -9.87,
   "yaw": 3.18,
   "image": "this.AnimatedImageResource_A725F30F_BEAA_6929_41BC_8C36D0B687CB",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B, this.camera_0A9ECA1D_0779_E676_4183_5445DFE9D6B1); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_AF20B056_A44A_EA62_41D1_CF5F389884DD",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 14.48,
   "yaw": 3.18,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.39,
   "pitch": -7.4,
   "yaw": 176.42,
   "image": "this.AnimatedImageResource_A725430F_BEAA_6929_41E0_3A4AC4764A44",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC, this.camera_086999F7_0779_E5B1_418E_717848C49E4B); this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B16F6064_BE6E_A71F_41B4_DD6D6521BD13",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 15.39,
   "yaw": 176.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.17,
   "pitch": -5.47,
   "yaw": -36.61,
   "image": "this.AnimatedImageResource_8C1094D2_BE6A_AF3A_4171_69F9BED6D1B8",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E, this.camera_08522B8A_0779_E652_419B_B675C4AB007C); this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_95E55970_BE6A_99F7_41BD_CD9D198E6066",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.17,
   "yaw": -36.61,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.01,
   "pitch": -10.83,
   "yaw": -160.85,
   "image": "this.AnimatedImageResource_91E8413A_BE7E_A96B_41A5_103B86A60DE8",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54, this.camera_08233B96_0779_E672_4159_672BB4FFC034); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_933D107F_BE7D_A7EA_4198_CBEB66098020",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.01,
   "yaw": -160.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.79,
   "pitch": -21.24,
   "yaw": 130.41,
   "image": "this.AnimatedImageResource_A7227308_BEAA_6917_4186_2F27D1DDDEC2",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA, this.camera_08409B7E_0779_E6B3_4156_379A53EBFB8A); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_FBB9F3CC_8E0C_EC08_41D9_E980F9988387",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.79,
   "yaw": 130.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.06,
   "pitch": -17.5,
   "yaw": 42.3,
   "image": "this.AnimatedImageResource_A728A310_BEAA_6937_41CC_8D6D203261C4",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751, this.camera_09DC09B4_0779_E5B7_4193_D4B21011990B); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B1B78E9A_BE6B_9B2A_41DA_21816CF70E99",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 15.06,
   "yaw": 42.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 19.96,
   "pitch": -8.65,
   "yaw": 172.44,
   "image": "this.AnimatedImageResource_A7280310_BEAA_6937_41C0_60F8EED9232B",
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC, this.camera_09C6A9A8_0779_E25F_4171_E30EBE286724); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_B1454F3D_BE6B_9969_41D1_C39287A6D85E",
 "data": {
  "label": "Arrow 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 19.96,
   "yaw": 172.44,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "layout": "horizontal",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "right": "0%",
 "width": 110,
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "height": 110,
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "button menu sup"
 },
 "overflow": "visible"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
  "this.IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "width": "91.304%",
 "bottom": "0%",
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "scrollBarMargin": 2,
 "height": "85.959%",
 "gap": 3,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "-button set"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "left": "0%",
 "width": 66,
 "children": [
  "this.Container_21F34780_3014_BF93_41A2_9BF700588BEC",
  "this.IconButton_223F0171_3014_B375_41C1_61063C3D73B3"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "shadow": false,
 "height": "100%",
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "- COLLAPSE"
 },
 "overflow": "scroll"
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "right": 0,
 "width": 330,
 "children": [
  "this.Container_4521E58D_74A8_853A_418A_CF7FF914DD83",
  "this.IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "height": "100%",
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "- EXPANDED"
 },
 "overflow": "visible"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "left": "15%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "10%",
 "bottom": "10%",
 "contentOpaque": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "minHeight": 1,
 "shadowHorizontalLength": 0,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "shadowVerticalLength": 0,
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "15%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "top": "10%",
 "bottom": "80%",
 "contentOpaque": false,
 "paddingRight": 20,
 "shadow": false,
 "scrollBarMargin": 2,
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 20,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "top": "10%",
 "bottom": "10%",
 "contentOpaque": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "minHeight": 1,
 "shadowHorizontalLength": 0,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "shadowVerticalLength": 0,
 "data": {
  "name": "Global"
 },
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "15%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "10%",
 "bottom": "10%",
 "contentOpaque": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "minHeight": 1,
 "shadowHorizontalLength": 0,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "shadowVerticalLength": 0,
 "data": {
  "name": "Global"
 },
 "propagateClick": true
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "15%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "top": "10%",
 "bottom": "80%",
 "contentOpaque": false,
 "paddingRight": 20,
 "shadow": false,
 "scrollBarMargin": 2,
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 20,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MapViewer",
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "top": "10%",
 "bottom": "10%",
 "contentOpaque": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "minHeight": 1,
 "shadowHorizontalLength": 0,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "shadowVerticalLength": 0,
 "data": {
  "name": "Global"
 },
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "top": "10%",
 "bottom": "10%",
 "contentOpaque": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "minHeight": 1,
 "shadowHorizontalLength": 0,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "shadowVerticalLength": 0,
 "data": {
  "name": "Global"
 },
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_1E19923C_57F1_802D_41C4_18DBE75E48C1",
 "left": "15%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_1E19E23C_57F1_802D_41D1_9B8B4D1D2BBD",
  "this.Container_1E19D23C_57F1_802D_41B0_92437DF80B82"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "10%",
 "bottom": "10%",
 "contentOpaque": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "minHeight": 1,
 "shadowHorizontalLength": 0,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "shadowVerticalLength": 0,
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "Container_1E18A23C_57F1_802D_41B9_D08FA26C7F4C",
 "left": "15%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "top": "10%",
 "bottom": "80%",
 "contentOpaque": false,
 "paddingRight": 20,
 "shadow": false,
 "scrollBarMargin": 2,
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 20,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A720F307_BEAA_6919_41DB_C49BBC80AA54",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A7203307_BEAA_6919_41DA_84C71FE8E6FF",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C82030_8E1C_63D3_41B9_78B73F8DDF5A_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A725C30F_BEAA_6929_41E2_CE634C4CE191",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CB2320_8E1C_E5F4_4175_660FBB43FDBC_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A7261310_BEAA_6937_41C7_0936F9D7593B",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A7266310_BEAA_6937_41DD_6FAFB9198120",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C28361_8E1C_2475_41CF_F286A506BC1C_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A71AF2FF_BEAA_68E9_41E5_D09F8255EE7E",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E005E7F3_8E04_1419_41CC_A40D04F101C4_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A5EEF86B_BEAA_A7EA_41E0_32C2F7CC48E1",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_8B96BE95_9BD6_16E6_41D3_A091D8AC52B5",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A5F1786B_BEAA_A7EA_41DE_BD710DFDA482",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0_HS_2_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_14DDCB50_0612_5C97_418A_6FFB8A806540",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CA2D39_8E1C_1DD5_41B4_AA0654C07A3D_0_HS_3_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A725830F_BEAA_6929_41D1_7E549A9C938D",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C8D42E_8E1C_23CF_41A7_C04341FADEAA_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A71C8D3C_BE56_B96E_41E4_377D62B960F4",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A71D7D3C_BE56_B96E_41D3_BA2A7CEE4DAF",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C29349_8E1C_65B5_41B6_C8838FCC12CC_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A722C308_BEAA_6917_41E3_04EF9A168AF1",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A7223308_BEAA_6917_41E6_6ECC25333253",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C8A911_8E1F_E5D5_41CA_215BF37BC0FA_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A71C6306_BEAA_691B_41AB_576E365F3B27",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A71DB306_BEAA_691B_41C0_069E86ABE918",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_141B374F_05ED_D48A_418B_EE539DAC76B7",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CEA52C_8E1C_2DF2_41D4_F77DD5F4CAE4_0_HS_2_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A71D0306_BEAA_691B_41B0_E995AEAE1748",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CF4C6E_8E1C_1C4F_41DF_50A4798D286D_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A7284311_BEAA_6939_41E5_1F6DBC231499",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C362AB_8E1D_E4F5_41C9_D6B35215888E_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A71CE305_BEAA_6919_41D7_DA50E203C735",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A71C1305_BEAA_6919_41BD_FF08B108D0B4",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9FBE58F_8E1C_6CCD_41D4_E512DA674184_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A721C308_BEAA_6917_41C1_590706A59F6D",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A712ED2A_BE56_B96A_41E0_1A3AFEC5187F",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0_HS_2_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A7128D2B_BE56_B96A_41D7_8A3BF1DE8583",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0_HS_3_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A7137D2B_BE56_B96A_41C5_48691F7C7EF3",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0_HS_4_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A7229308_BEAA_6917_41E0_5B189DE75BB2",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9F077FA_8E1C_2C57_41D8_5698F7889FDB_0_HS_5_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A7279310_BEAA_6937_41B6_DF8620F4173F",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A727D310_BEAA_6937_41E5_858786AEF9F3",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C2A35A_8E1C_6457_41D2_CEBF5D1391B1_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A725830E_BEAA_692B_41C0_B6629FAC7C6C",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A723530F_BEAA_6929_41E0_3B8AD31C9A64",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A724A30F_BEAA_6929_41CE_CB22B0108AFC",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CBD58C_8E1C_6CB3_41C7_F5A88CDE4792_0_HS_2_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A7218307_BEAA_6919_41B5_015F1D19DE5F",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C8A3EE_8E1C_244F_41D4_BAFA0CA59294_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A724E30F_BEAA_6929_41B3_ABEC4774249E",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A724230F_BEAA_6929_41D3_ECCD7A9A6E62",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C884B9_8E1C_2CD5_41C5_845B31A12B27_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A71BE304_BEAA_691F_41A8_5522D754D4AC",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A71B3305_BEAA_6919_41E0_DFB0E8DA0D01",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A71C8305_BEAA_6919_41D3_81373E4DFF84",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_FAA26DA6_8E04_1438_41D8_D5E88019BEF9_0_HS_2_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A724430E_BEAA_692B_41B6_1050967C42C5",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C97647_8E1C_6FBD_41CE_D975894FFC8F_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A71E2306_BEAA_691B_41CE_2F95A0BE7F11",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A71E7306_BEAA_691B_41DC_E983545D8E35",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CBC6F7_8E1C_EC5D_419F_72ADA0F88706_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A71D5306_BEAA_691B_41E6_9F1319B38577",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A71EC306_BEAA_691B_41E6_3A06F451EE7F",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1179A185_05EE_EC79_418A_44484AD2395D",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CA361B_8E1C_2FD5_41C7_9AD7A5AF8F54_0_HS_2_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A724B30E_BEAA_692B_41DB_4E6826E5B8E5",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A724130E_BEAA_692B_41E6_C635EEF9DB25",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_95693F0D_9BD6_17E6_41B3_3EF12CC864F7_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_8B971E95_9BD6_16E6_41D3_2970934EF476",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A714ED27_BE56_B91A_41B9_7200915BB6E8",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C86C54_8E1C_3C53_41CA_B5FB1FBB572A_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A723A30D_BEAA_6929_41BD_85551A3DA113",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A723E30E_BEAA_692B_41E0_581703B9AA0F",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0_HS_2_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A723430E_BEAA_692B_41D4_F05F550FED40",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0_HS_3_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A723730E_BEAA_692B_41E2_1F96F909E5AC",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9CBE7E4_8E1C_2C73_41D2_28B247E08B1A_0_HS_4_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A726930F_BEAA_6929_41C4_4F66004F430E",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A726C310_BEAA_6937_41C1_FD35313FBD1A",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C2E2C7_8E1C_24BD_41C4_EAC61D3D509B_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A725F30F_BEAA_6929_41BC_8C36D0B687CB",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A725430F_BEAA_6929_41E0_3A4AC4764A44",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C2D289_8E1C_E4B5_41D0_E0A979503278_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_8C1094D2_BE6A_AF3A_4171_69F9BED6D1B8",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_91E8413A_BE7E_A96B_41A5_103B86A60DE8",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C29474_8E1C_2C53_41DE_80F09B9DE751_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A7227308_BEAA_6917_4186_2F27D1DDDEC2",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C928DE_8E1F_E44E_41CE_1681B60DBD1E_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A728A310_BEAA_6937_41CC_8D6D203261C4",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A7280310_BEAA_6937_41C0_60F8EED9232B",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_E9C35348_8E1D_E5B2_41D2_8AE7C39BE4B6_0_HS_1_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 480
  }
 ]
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "paddingLeft": 0,
 "width": 60,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "maxWidth": 60,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "paddingRight": 0,
 "mode": "toggle",
 "shadow": false,
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "height": 60,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "maxHeight": 60,
 "data": {
  "name": "image button menu"
 },
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "paddingLeft": 0,
 "width": 58,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "maxWidth": 58,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "click": "this.shareTwitter(window.location.href)",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "maxHeight": 58,
 "data": {
  "name": "IconButton TWITTER"
 },
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521",
 "paddingLeft": 0,
 "width": 58,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "maxWidth": 58,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521.png",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "click": "this.shareFacebook(window.location.href)",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521_rollover.png",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "maxHeight": 58,
 "data": {
  "name": "IconButton FB"
 },
 "cursor": "hand"
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "id": "Container_21F34780_3014_BF93_41A2_9BF700588BEC",
 "paddingLeft": 0,
 "propagateClick": true,
 "width": 36,
 "scrollBarColor": "#000000",
 "left": "0%",
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "backgroundColor": [
  "#000000"
 ],
 "gap": 10,
 "height": "100%",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.4,
 "borderRadius": 0,
 "data": {
  "name": "Container black"
 },
 "overflow": "scroll"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_223F0171_3014_B375_41C1_61063C3D73B3",
 "left": 10,
 "paddingLeft": 0,
 "width": 50,
 "maxWidth": 80,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "top": "40%",
 "iconURL": "skin/IconButton_223F0171_3014_B375_41C1_61063C3D73B3.png",
 "bottom": "40%",
 "mode": "push",
 "paddingRight": 0,
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, false, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, true, 0, null, null, false)",
 "rollOverIconURL": "skin/IconButton_223F0171_3014_B375_41C1_61063C3D73B3_rollover.png",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "maxHeight": 80,
 "data": {
  "name": "IconButton arrow"
 },
 "cursor": "hand"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_4521E58D_74A8_853A_418A_CF7FF914DD83",
 "paddingLeft": 0,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_0B85764A_2D07_4D95_41A5_3AC872515A8C"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "0%",
 "width": "90%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "height": "100%",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "Container"
 },
 "overflow": "scroll"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882",
 "paddingLeft": 0,
 "width": 50,
 "maxWidth": 50,
 "right": 9,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "top": "40%",
 "iconURL": "skin/IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882.png",
 "bottom": "40%",
 "mode": "push",
 "paddingRight": 0,
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false)",
 "rollOverIconURL": "skin/IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882_rollover.png",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "maxHeight": 50,
 "data": {
  "name": "IconButton collapse"
 },
 "cursor": "hand"
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "paddingLeft": 0,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "width": "85%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "backgroundColor": [
  "#000000"
 ],
 "gap": 10,
 "height": "100%",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "-left"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "paddingLeft": 50,
 "propagateClick": false,
 "scrollBarColor": "#0069A3",
 "scrollBarOpacity": 0.51,
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "minWidth": 460,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "50%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 50,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 0,
 "height": "100%",
 "minHeight": 1,
 "paddingTop": 20,
 "class": "Container",
 "paddingBottom": 20,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "-right"
 },
 "overflow": "visible"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "minWidth": 50,
 "borderSize": 0,
 "horizontalAlign": "center",
 "maxWidth": 60,
 "verticalAlign": "middle",
 "width": "25%",
 "mode": "push",
 "paddingRight": 0,
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "height": "75%",
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "minHeight": 50,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "maxHeight": 60,
 "data": {
  "name": "X"
 },
 "cursor": "hand"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "layout": "absolute",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 140,
 "paddingRight": 0,
 "shadow": false,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "header"
 },
 "overflow": "scroll"
},
{
 "itemThumbnailWidth": 220,
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "scrollBarColor": "#04A3E1",
 "itemMode": "normal",
 "left": 0,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "scrollBarOpacity": 0.5,
 "itemLabelHorizontalAlign": "center",
 "minWidth": 1,
 "itemMaxWidth": 1000,
 "scrollBarVisible": "rollOver",
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "itemMaxHeight": 1000,
 "horizontalAlign": "center",
 "itemLabelFontStyle": "italic",
 "width": "100%",
 "itemLabelFontFamily": "Oswald",
 "itemThumbnailOpacity": 1,
 "verticalAlign": "middle",
 "itemPaddingRight": 3,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemBorderRadius": 0,
 "paddingRight": 70,
 "shadow": false,
 "selectedItemLabelFontColor": "#04A3E1",
 "itemLabelPosition": "bottom",
 "height": "92%",
 "itemPaddingLeft": 3,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemHorizontalAlign": "center",
 "itemOpacity": 1,
 "itemBackgroundOpacity": 0,
 "backgroundOpacity": 0,
 "class": "ThumbnailGrid",
 "itemThumbnailBorderRadius": 0,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemBackgroundColor": [],
 "itemPaddingTop": 3,
 "itemBackgroundColorRatios": [],
 "propagateClick": true,
 "itemWidth": 220,
 "paddingLeft": 70,
 "selectedItemThumbnailShadow": true,
 "itemMinHeight": 50,
 "borderSize": 0,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "selectedItemLabelFontWeight": "bold",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "rollOverItemLabelFontColor": "#04A3E1",
 "rollOverItemThumbnailShadow": true,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "bottom": -0.2,
 "itemLabelFontSize": 16,
 "itemMinWidth": 50,
 "scrollBarMargin": 2,
 "itemVerticalAlign": "top",
 "itemLabelFontColor": "#666666",
 "itemThumbnailScaleMode": "fit_outside",
 "itemHeight": 160,
 "gap": 26,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 125,
 "paddingTop": 10,
 "minHeight": 1,
 "itemThumbnailShadow": false,
 "paddingBottom": 70,
 "borderRadius": 5,
 "itemPaddingBottom": 3,
 "data": {
  "name": "ThumbnailList"
 },
 "itemLabelGap": 7,
 "scrollBarWidth": 10
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "paddingLeft": 0,
 "propagateClick": true,
 "width": "100%",
 "minWidth": 1,
 "borderSize": 0,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735.4714006374506!2d-47.414293185075074!3d-20.568797986249333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a86060fbb4cd%3A0x46c65e77be125dd5!2sResidencial%20Olivito!5e0!3m2!1spt-BR!2sbr!4v1640795500531!5m2!1spt-BR!2sbr",
 "backgroundColorDirection": "vertical",
 "scrollEnabled": true,
 "paddingRight": 0,
 "shadow": false,
 "insetBorder": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "height": "100%",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "WebFrame",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "WebFrame"
 }
},
{
 "transparencyActive": false,
 "propagateClick": true,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "minWidth": 50,
 "borderSize": 0,
 "horizontalAlign": "center",
 "maxWidth": 60,
 "verticalAlign": "middle",
 "width": "25%",
 "mode": "push",
 "paddingRight": 0,
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "height": "75%",
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "minHeight": 50,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "maxHeight": 60,
 "data": {
  "name": "X"
 },
 "cursor": "hand"
},
{
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "id": "MapViewer",
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "left": 0,
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "minWidth": 1,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipFontSize": 12,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "paddingRight": 0,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "shadow": false,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "height": "99.975%",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "class": "ViewerArea",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "paddingLeft": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "minHeight": 1,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingLeft": 6,
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Floor Plan"
 }
},
{
 "propagateClick": true,
 "children": [
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "layout": "absolute",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "height": 140,
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "header"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "height": "100%",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "Container photo"
 },
 "overflow": "visible"
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "id": "Container_1E19E23C_57F1_802D_41D1_9B8B4D1D2BBD",
 "paddingLeft": 0,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "width": "55%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "backgroundColor": [
  "#000000"
 ],
 "gap": 10,
 "height": "100%",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "-left"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_1E19D23C_57F1_802D_41B0_92437DF80B82",
 "paddingLeft": 60,
 "propagateClick": false,
 "scrollBarColor": "#0069A3",
 "scrollBarOpacity": 0.51,
 "children": [
  "this.Container_1E18223C_57F1_802D_41D5_C1ECF1EB519F",
  "this.Container_1E18323C_57F1_802D_41AC_3EB4DE555BBC",
  "this.Container_1E18523C_57F1_802D_41B1_88C86CD9A273"
 ],
 "minWidth": 460,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "45%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 60,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 0,
 "height": "100%",
 "minHeight": 1,
 "paddingTop": 20,
 "class": "Container",
 "paddingBottom": 20,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "-right"
 },
 "overflow": "visible"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "id": "IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF.jpg",
 "minWidth": 50,
 "borderSize": 0,
 "horizontalAlign": "center",
 "maxWidth": 60,
 "verticalAlign": "middle",
 "width": "25%",
 "mode": "push",
 "paddingRight": 0,
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_1E18823C_57F1_802D_41C1_C325A6BB2CA9, false, 0, null, null, false)",
 "height": "75%",
 "rollOverIconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF_rollover.jpg",
 "minHeight": 50,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_1E18B23C_57F1_802D_41C8_61C0F9BCC1FF_pressed.jpg",
 "maxHeight": 60,
 "data": {
  "name": "X"
 },
 "cursor": "hand"
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "id": "Container_0B85764A_2D07_4D95_41A5_3AC872515A8C",
 "paddingLeft": 40,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Image_0435F73B_2D0F_4BF4_4181_65F86A8DAC19",
  "this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE",
  "this.Container_19256A12_2D07_45B5_41AB_E9DE96B2DFF3",
  "this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B",
  "this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B",
  "this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D",
  "this.Container_1758A215_31FA_0014_41B6_9A4A5384548B",
  "this.Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE",
  "this.Container_168D8311_3106_01EC_41B0_F2D40886AB88",
  "this.Image_134E83C1_06EE_53F9_4175_B30DAFB1B611",
  "this.Image_122DC97E_0612_DC8B_4169_1E858AFC2145",
  "this.Image_12EDA2AB_06EE_2D8A_4194_8EC8982B9B75"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "0%",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 40,
 "shadow": false,
 "backgroundColor": [
  "#000000"
 ],
 "gap": 10,
 "height": "100%",
 "minHeight": 1,
 "paddingTop": 40,
 "class": "Container",
 "paddingBottom": 40,
 "backgroundOpacity": 0.7,
 "borderRadius": 0,
 "data": {
  "name": "- Buttons set"
 },
 "overflow": "scroll"
},
{
 "propagateClick": false,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "paddingLeft": 0,
 "left": "0%",
 "maxWidth": 2000,
 "width": "100%",
 "minWidth": 1,
 "borderSize": 0,
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "top": "0%",
 "paddingRight": 0,
 "shadow": false,
 "height": "100%",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Image",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "visible": false,
 "maxHeight": 1000,
 "data": {
  "name": "Image"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "layout": "horizontal",
 "paddingLeft": 0,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 60,
 "paddingRight": 0,
 "shadow": false,
 "gap": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 0,
 "paddingTop": 20,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "paddingLeft": 0,
 "propagateClick": false,
 "scrollBarColor": "#E73B2C",
 "scrollBarOpacity": 0.79,
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "minWidth": 100,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "height": "100%",
 "minHeight": 520,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 30,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "Container text"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "layout": "horizontal",
 "paddingLeft": 0,
 "propagateClick": false,
 "width": 370,
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "shadow": false,
 "gap": 10,
 "height": 40,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll"
},
{
 "transparencyActive": false,
 "propagateClick": true,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "paddingLeft": 0,
 "maxWidth": 60,
 "right": 20,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "minWidth": 50,
 "borderSize": 0,
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "top": 20,
 "width": "100%",
 "mode": "push",
 "paddingRight": 0,
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "height": "36.14%",
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "minHeight": 50,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "maxHeight": 60,
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "propagateClick": true,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "paddingLeft": 0,
 "maxWidth": 60,
 "right": 20,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "minWidth": 50,
 "borderSize": 0,
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "top": 20,
 "width": "100%",
 "mode": "push",
 "paddingRight": 0,
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "height": "36.14%",
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "minHeight": 50,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "maxHeight": 60,
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand"
},
{
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "left": "0%",
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "minWidth": 1,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipFontSize": 12,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "paddingRight": 0,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "shadow": false,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "class": "ViewerArea",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "paddingLeft": 0,
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": "0%",
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "minHeight": 1,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingLeft": 6,
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Viewer photoalbum 1"
 }
},
{
 "transparencyActive": false,
 "propagateClick": true,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "paddingLeft": 0,
 "maxWidth": 60,
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "minWidth": 50,
 "borderSize": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "top": "20%",
 "width": "14.22%",
 "bottom": "20%",
 "mode": "push",
 "paddingRight": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "minHeight": 50,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "maxHeight": 60,
 "data": {
  "name": "IconButton <"
 },
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "propagateClick": true,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "paddingLeft": 0,
 "maxWidth": 60,
 "right": 10,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "minWidth": 50,
 "borderSize": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "top": "20%",
 "width": "14.22%",
 "bottom": "20%",
 "mode": "push",
 "paddingRight": 0,
 "shadow": false,
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "minHeight": 50,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "maxHeight": 60,
 "data": {
  "name": "IconButton >"
 },
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "propagateClick": true,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "paddingLeft": 0,
 "maxWidth": 60,
 "right": 20,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "minWidth": 50,
 "borderSize": 0,
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "top": 20,
 "width": "10%",
 "mode": "push",
 "paddingRight": 0,
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "height": "10%",
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "minHeight": 50,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "maxHeight": 60,
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand"
},
{
 "propagateClick": false,
 "id": "Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1",
 "paddingLeft": 0,
 "left": "0%",
 "maxWidth": 2000,
 "width": "100%",
 "minWidth": 1,
 "borderSize": 0,
 "url": "skin/Image_1E19C23C_57F1_802D_41D1_9DC72DB5C1E1.jpg",
 "horizontalAlign": "center",
 "verticalAlign": "bottom",
 "top": "0%",
 "paddingRight": 0,
 "shadow": false,
 "height": "100%",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Image",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "maxHeight": 1000,
 "data": {
  "name": "Image40635"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_1E18223C_57F1_802D_41D5_C1ECF1EB519F",
 "paddingLeft": 0,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 0,
 "height": "5%",
 "minHeight": 0,
 "paddingTop": 20,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_1E18323C_57F1_802D_41AC_3EB4DE555BBC",
 "paddingLeft": 0,
 "propagateClick": false,
 "scrollBarColor": "#E73B2C",
 "scrollBarOpacity": 0.79,
 "children": [
  "this.HTMLText_1E18123C_57F1_802D_41D2_B0CD0D6533F4",
  "this.Container_1E18623C_57F1_802D_41D5_C4D10C61A206"
 ],
 "minWidth": 100,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "height": "100%",
 "minHeight": 520,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 30,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "Container text"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_1E18523C_57F1_802D_41B1_88C86CD9A273",
 "layout": "horizontal",
 "paddingLeft": 0,
 "propagateClick": false,
 "width": 370,
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "shadow": false,
 "gap": 10,
 "height": 40,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "id": "Image_0435F73B_2D0F_4BF4_4181_65F86A8DAC19",
 "paddingLeft": 0,
 "left": "0%",
 "maxWidth": 1095,
 "width": "100%",
 "minWidth": 40,
 "borderSize": 0,
 "url": "skin/Image_0435F73B_2D0F_4BF4_4181_65F86A8DAC19.jpeg",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "top": "0%",
 "paddingRight": 0,
 "shadow": false,
 "height": "25%",
 "minHeight": 30,
 "paddingTop": 0,
 "class": "Image",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "maxHeight": 1095,
 "data": {
  "name": "Image Company"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE",
 "layout": "vertical",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_208C289A_3033_51B4_41BC_C3F8D8B8F86D",
  "this.Button_0AEB5577_2D08_CE7B_41B6_192923248F4E",
  "this.Container_106C4A62_2D09_C594_41C0_0D00619DF541",
  "this.Button_0A054365_2D09_CB9F_4145_8C365B373D19",
  "this.Container_152401E8_2D0B_4694_41C5_9141C985F9C3",
  "this.Button_0B73474A_2D18_CB95_41B5_180037BA80BC",
  "this.Container_15283BED_2D08_DA6F_41C5_5635F0C6DB03"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "verticalAlign": "middle",
 "top": "26%",
 "width": "100%",
 "bottom": "26%",
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "scrollBarMargin": 2,
 "gap": 0,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "-Level 1"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_19256A12_2D07_45B5_41AB_E9DE96B2DFF3",
 "left": "0%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_193B8A52_2D1B_C5B5_41C3_F44FF520A3F0",
  "this.HTMLText_29DD1615_3597_79DF_41C4_7593739E5260",
  "this.Container_2B9EE463_3593_BA7B_4195_8E8F4568BB13",
  "this.Container_283049D5_35F3_AA5F_419D_20B6A59ABCA6"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "bottom",
 "width": "100%",
 "bottom": "0%",
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "scrollBarMargin": 2,
 "height": 130,
 "gap": 5,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "-Container footer"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_2A2CB53C_310E_0014_41C3_AB834B10253B",
 "left": "0%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Button_2A2DA53B_310E_001C_41C7_8885E712C50B",
  "this.Container_2A2DB53B_310E_001C_41BA_0206228E495C",
  "this.Container_1303E3BB_3106_001D_41C8_60D6F4D70B2F",
  "this.Button_2A2D853B_310E_001C_41C4_1C2E2BAFC35D",
  "this.Button_2A2DE53B_310E_001C_41BB_C7AB6950A4DD",
  "this.Button_2A2C253B_310E_001C_41B6_D3A7F4F68C3E",
  "this.Button_2A2C053B_310E_001C_41A2_583DE489828C",
  "this.Button_2A2C753B_310E_001C_41C4_B649CCC20E3D",
  "this.Button_2A2C553C_310E_0014_41C4_86393D0ADCC7",
  "this.Button_15EF2665_3106_0035_41AE_9BACA1A48D02",
  "this.Button_15F5A318_3106_001C_41C5_9AA2EF2184CF",
  "this.Button_1203FDB8_3106_001C_41B6_C9BE8EDD0DA9",
  "this.Button_13D4FC1E_310A_0017_41BA_DDA6D071C1BA",
  "this.Button_E967C45C_C9EE_B8F2_41E2_85972F42D0D4",
  "this.Button_D9C39BE3_C9A6_EFD7_41E3_F4CEEE9ED4F5",
  "this.Button_D8A2C02E_C9A7_F851_41BF_9B78417198F1"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "middle",
 "top": "25%",
 "width": "100%",
 "bottom": "25%",
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "scrollBarMargin": 2,
 "gap": 0,
 "minHeight": 1,
 "creationPolicy": "inAdvance",
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "-Level 2-1"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_159EADDD_31FA_0014_41C8_8A5203EC627B",
 "left": "0%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1",
  "this.Container_15A14DDC_31FA_0014_41BE_C93192DD207E",
  "this.Container_15A16DDC_31FA_0014_4199_0FBF7553300D",
  "this.Button_15A10DDC_31FA_0014_4185_021C898E177D",
  "this.Button_15A13DDC_31FA_0014_41C5_41AE80876834",
  "this.Button_15A12DDC_31FA_0014_416B_ED845741AE5F",
  "this.Button_159EDDDC_31FA_0014_419A_61C18E43FE01",
  "this.Button_159ECDDC_31FA_0014_41B9_2D5AB1021813"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "middle",
 "top": "25%",
 "width": "100%",
 "bottom": "25%",
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "scrollBarMargin": 2,
 "gap": 0,
 "minHeight": 1,
 "creationPolicy": "inAdvance",
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "-Level 2-2"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_17569D7D_31FA_0015_41C4_CBC688763A8D",
 "left": "0%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Button_1757CD7D_31FA_0015_4143_A9E37B16A50B",
  "this.Container_17579D7D_31FA_0015_41A1_D2B94269F28D",
  "this.Container_17578D7D_31FA_0015_41BE_353D3005648A",
  "this.Button_1757AD7D_31FA_0015_41C7_FB79F56FA149",
  "this.Button_17565D7D_31FA_0015_4193_78BBCB2DC70F",
  "this.Button_17564D7D_31FA_0015_41B8_A9191CD56C52",
  "this.Button_17567D7D_31FA_0015_41C2_1E0D0AF05C7A",
  "this.Button_17566D7D_31FA_0015_41AD_98D7C60C694F",
  "this.Button_17561D7D_31FA_0015_41B5_BD72FAC26B8B",
  "this.Button_E2225B25_C9FB_6852_41E0_F30DA3EE921A"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "middle",
 "top": "25%",
 "width": "100%",
 "bottom": "25%",
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "scrollBarMargin": 2,
 "gap": 0,
 "minHeight": 1,
 "creationPolicy": "inAdvance",
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "-Level 2-3"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_1758A215_31FA_0014_41B6_9A4A5384548B",
 "left": "0%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Button_175A5214_31FA_0014_4198_930DF49BADD9",
  "this.Container_175A4215_31FA_0014_41B2_5B8676CC3F2F",
  "this.Container_1759B215_31FA_0014_41C0_84C99CBD5517",
  "this.Button_1759A215_31FA_0014_41C7_F6B1044E5BB3",
  "this.Button_17598215_31FA_0014_41AC_1166AB319171",
  "this.Button_1759F215_31FA_0014_41BD_BBFA5FB0D882",
  "this.Button_1759D215_31FA_0014_41AD_B6C5744A0B97",
  "this.Button_17593215_31FA_0014_41C0_42BAFB0080F0",
  "this.Button_17592215_31FA_0014_41B2_AA3B5CC318B8",
  "this.Button_17590215_31FA_0014_41C1_2B2D012DCC76",
  "this.Button_17597215_31FA_0014_41C0_9BEE1DE4D7F6",
  "this.Button_17596215_31FA_0014_41C6_A42670770708",
  "this.Button_1758B215_31FA_0014_41BC_C4EAC2A9544B"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "middle",
 "top": "25%",
 "width": "100%",
 "bottom": "25%",
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "scrollBarMargin": 2,
 "gap": 0,
 "minHeight": 1,
 "creationPolicy": "inAdvance",
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "-Level 2-4"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE",
 "left": "0%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C",
  "this.Container_17EA92B7_3106_0014_41A6_2B88DF32BBA7",
  "this.Container_17EAA2B7_3106_0014_41B0_ACBB1485A79E",
  "this.Button_17EAB2B7_3106_0014_41A7_209417AD3E9A",
  "this.Button_17EAD2B7_3106_0014_41C0_0B5453B4841D",
  "this.Button_17EAE2B7_3106_0014_41C7_DB7FC43AAEE0",
  "this.Button_17EB02B7_3106_0014_41AF_05D9AC36B189",
  "this.Button_17EB32B7_3106_0014_41C8_467BF6AECBE8",
  "this.Button_17EB42B7_3106_0014_41B0_CE70CBDDF438",
  "this.Button_17EB52B7_3106_0014_419C_439E593AEC43",
  "this.Button_17EB62B7_3106_0014_41C5_43B38271B353",
  "this.Button_17EB72B7_3106_0014_41B9_61857077BF4A",
  "this.Button_17EB92B7_3106_0014_41B2_34A3E3F63779"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "middle",
 "top": "25%",
 "width": "100%",
 "bottom": "25%",
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "scrollBarMargin": 2,
 "gap": 0,
 "minHeight": 1,
 "creationPolicy": "inAdvance",
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "-Level 2-5"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_168D8311_3106_01EC_41B0_F2D40886AB88",
 "left": "0%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Button_168CA310_3106_01EC_41C7_72CE0522951A",
  "this.Container_168C8310_3106_01EC_4187_B16F315A4A23",
  "this.Container_168D7310_3106_01EC_41BE_5FCBD9E27BE4",
  "this.Button_168D6310_3106_01EC_41B8_A0B6BE627547",
  "this.Button_168D5310_3106_01EC_41B5_96D9387401B8",
  "this.Button_168D3310_3106_01EC_41AC_5D524E4677A5",
  "this.Button_168D2310_3106_01EC_41B8_9D7D1B2B55FA",
  "this.Button_168D0310_3106_01EC_41A1_FA8FC42E6FF3",
  "this.Button_168DE310_3106_01EC_4192_6A9F468A0ADE",
  "this.Button_168DD310_3106_01EC_4190_7815FA70349E",
  "this.Button_168DB310_3106_01EC_41B2_3511AA5E40E1",
  "this.Button_168DA310_3106_01EC_41BE_DF88732C2A28",
  "this.Button_168D9311_3106_01EC_41A8_3BD8769525D6"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "middle",
 "top": "25%",
 "width": "100%",
 "bottom": "25%",
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "scrollBarMargin": 2,
 "gap": 0,
 "minHeight": 1,
 "creationPolicy": "inAdvance",
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "-Level 2-6"
 },
 "overflow": "scroll"
},
{
 "propagateClick": false,
 "id": "Image_134E83C1_06EE_53F9_4175_B30DAFB1B611",
 "paddingLeft": 0,
 "left": "0.24%",
 "maxWidth": 225,
 "right": "80.57%",
 "minWidth": 1,
 "borderSize": 0,
 "url": "skin/Image_134E83C1_06EE_53F9_4175_B30DAFB1B611.png",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "bottom": "22.55%",
 "paddingRight": 0,
 "shadow": false,
 "click": "this.openLink('https://www.facebook.com/lucasmendesimoveis/', '_blank')",
 "height": "5.722%",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Image",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "maxHeight": 225,
 "data": {
  "name": "Image8991"
 },
 "cursor": "hand"
},
{
 "propagateClick": false,
 "id": "Image_122DC97E_0612_DC8B_4169_1E858AFC2145",
 "paddingLeft": 0,
 "left": "67.4%",
 "maxWidth": 1095,
 "right": "0%",
 "minWidth": 1,
 "borderSize": 0,
 "url": "skin/Image_122DC97E_0612_DC8B_4169_1E858AFC2145.png",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "bottom": "22.32%",
 "paddingRight": 0,
 "shadow": false,
 "click": "this.openLink('https://instagram.com/lmendesimoveis?utm_medium=copy_link', '_blank')",
 "height": "6.624%",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Image",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "maxHeight": 1095,
 "data": {
  "name": "Image9677"
 },
 "cursor": "hand"
},
{
 "propagateClick": false,
 "id": "Image_12EDA2AB_06EE_2D8A_4194_8EC8982B9B75",
 "paddingLeft": 0,
 "left": "35.4%",
 "maxWidth": 1082,
 "right": "37.99%",
 "minWidth": 1,
 "borderSize": 0,
 "url": "skin/Image_12EDA2AB_06EE_2D8A_4194_8EC8982B9B75.png",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "bottom": "21.76%",
 "paddingRight": 0,
 "shadow": false,
 "click": "this.openLink('https://api.whatsapp.com/send?phone=5516992472323', '_blank')",
 "height": "7.238%",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Image",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "maxHeight": 1108,
 "data": {
  "name": "Image8880"
 },
 "cursor": "hand"
},
{
 "propagateClick": false,
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "paddingLeft": 10,
 "scrollBarColor": "#04A3E1",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "scrollBarMargin": 2,
 "paddingRight": 10,
 "shadow": false,
 "height": "100%",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "HTMLText",
 "paddingBottom": 20,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:8.3vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.58vh;font-family:'Oswald';\"><B><I>LOREM IPSUM</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.58vh;font-family:'Oswald';\"><B><I>DOLOR SIT AMET</I></B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.58vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:2.58vh;font-family:'Oswald';\"><B>CONSECTETUR ADIPISCING ELIT. MORBI BIBENDUM PHARETRA LOREM, ACCUMSAN SAN NULLA.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.86vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV><p STYLE=\"margin:0; line-height:0.86vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></DIV><p STYLE=\"margin:0; line-height:2.58vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.58vh;font-family:'Oswald';\"><B><I>DONEC FEUGIAT:</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.72vh;\"> </SPAN>\u2022 Nisl nec mi sollicitudin facilisis </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Nam sed faucibus est.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Ut eget lorem sed leo.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></DIV><p STYLE=\"margin:0; line-height:2.58vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.58vh;font-family:'Oswald';\"><B><I>LOREM IPSUM:</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:2.72vh;font-family:'Oswald';\"><B>$150,000</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "scrollBarWidth": 10
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "Button"
 },
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "layout": "horizontal",
 "paddingLeft": 0,
 "propagateClick": false,
 "width": 180,
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "iconHeight": 32,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "pressedBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#04A3E1"
 ],
 "mode": "push",
 "paddingRight": 0,
 "fontSize": "2.39vh",
 "shadow": false,
 "label": "LOREM IPSUM",
 "shadowBlurRadius": 6,
 "gap": 5,
 "height": 50,
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0.7,
 "borderRadius": 50,
 "rollOverBackgroundOpacity": 1,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "bold"
},
{
 "propagateClick": false,
 "id": "HTMLText_1E18123C_57F1_802D_41D2_B0CD0D6533F4",
 "paddingLeft": 0,
 "scrollBarColor": "#04A3E1",
 "scrollBarOpacity": 0,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "shadow": false,
 "height": "46%",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "HTMLText",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:8.3vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.58vh;font-family:'Oswald';\"><B><I>LOREM IPSUM</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.58vh;font-family:'Oswald';\"><B><I>DOLOR SIT AMET</I></B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText18899"
 },
 "scrollBarWidth": 10
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_1E18623C_57F1_802D_41D5_C4D10C61A206",
 "paddingLeft": 0,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Image_1E18723C_57F1_802D_41C5_8325536874A5",
  "this.HTMLText_1E18423C_57F1_802D_41C4_458DB7F892AC"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "gap": 10,
 "height": "75%",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "- content"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_208C289A_3033_51B4_41BC_C3F8D8B8F86D",
 "layout": "absolute",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "paddingRight": 0,
 "shadow": false,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_0AEB5577_2D08_CE7B_41B6_192923248F4E",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button Tour Info"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "\u00c1REAS EXTERNAS >",
 "height": 50,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B, true, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_106C4A62_2D09_C594_41C0_0D00619DF541",
 "layout": "absolute",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "paddingRight": 0,
 "shadow": false,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_0A054365_2D09_CB9F_4145_8C365B373D19",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button Panorama List"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "\u00c1REAS INTERNAS >",
 "height": 50,
 "shadowBlurRadius": 6,
 "gap": 23,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B, true, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_152401E8_2D0B_4694_41C5_9141C985F9C3",
 "layout": "absolute",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "paddingRight": 0,
 "shadow": false,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_0B73474A_2D18_CB95_41B5_180037BA80BC",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button Location"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "pressedLabel": "Inserdt Text",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "SU\u00cdTES >",
 "height": 50,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false); this.setComponentVisibility(this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D, true, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_15283BED_2D08_DA6F_41C5_5635F0C6DB03",
 "layout": "absolute",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "paddingRight": 0,
 "shadow": false,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "id": "Container_193B8A52_2D1B_C5B5_41C3_F44FF520A3F0",
 "layout": "horizontal",
 "paddingLeft": 0,
 "propagateClick": true,
 "width": 40,
 "scrollBarColor": "#000000",
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#5CA1DE"
 ],
 "paddingRight": 0,
 "shadow": false,
 "gap": 10,
 "height": 2,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "blue line"
 },
 "overflow": "visible"
},
{
 "propagateClick": true,
 "id": "HTMLText_29DD1615_3597_79DF_41C4_7593739E5260",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "shadow": false,
 "height": 78,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "HTMLText",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>Company Name</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>www.loremipsum.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>info@loremipsum.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>Tlf.: +11 111 111 111</I></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText47602"
 },
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "children": [
  "this.IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83",
  "this.IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F"
 ],
 "id": "Container_2B9EE463_3593_BA7B_4195_8E8F4568BB13",
 "layout": "horizontal",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "verticalAlign": "bottom",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "height": 56,
 "gap": 7,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "-Container Icons 1"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "children": [
  "this.IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F"
 ],
 "id": "Container_283049D5_35F3_AA5F_419D_20B6A59ABCA6",
 "layout": "horizontal",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "height": 44,
 "gap": 7,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "-Container Icons 2"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverIconURL": "skin/Button_2A2DA53B_310E_001C_41C7_8885E712C50B_rollover.png",
 "id": "Button_2A2DA53B_310E_001C_41C7_8885E712C50B",
 "layout": "horizontal",
 "paddingLeft": 5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconURL": "skin/Button_2A2DA53B_310E_001C_41C7_8885E712C50B.png",
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 30,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "rollOverFontFamily": "Oswald",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "rollOverFontSize": 18,
 "shadow": false,
 "label": "VOLTAR",
 "height": 50,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_2A2DB53B_310E_001C_41BA_0206228E495C",
 "layout": "absolute",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "paddingRight": 0,
 "shadow": false,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "borderRadius": 0,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "id": "Container_1303E3BB_3106_001D_41C8_60D6F4D70B2F",
 "layout": "absolute",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "height": 8,
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_2A2D853B_310E_001C_41C4_1C2E2BAFC35D",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Rua ",
 "height": 36,
 "shadowBlurRadius": 15,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_09358907_0779_E251_4198_F91D181D02EC, 0, 0);; this.mainPlayList.set('selectedIndex', 0)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "rollOverShadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_2A2DE53B_310E_001C_41BB_C7AB6950A4DD",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Entrada principal ",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 23,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 1)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_2A2C253B_310E_001C_41B6_D3A7F4F68C3E",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "pressedLabel": "Reception",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Garagem ",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_0934C908_0779_E25F_4198_B778B6152801, 0, 0);; this.mainPlayList.set('selectedIndex', 2)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_2A2C053B_310E_001C_41A2_583DE489828C",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Corredor lateral 1",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_09332908_0779_E25F_4162_6EBAE3D9DD7E, 0, 0);; this.mainPlayList.set('selectedIndex', 20)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_2A2C753B_310E_001C_41C4_B649CCC20E3D",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Corredor lateral 2",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 21)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_2A2C553C_310E_0014_41C4_86393D0ADCC7",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Corredor lateral 2",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_0930D911_0779_E271_4199_F4AE25BABD25, 0, 0);; this.mainPlayList.set('selectedIndex', 22)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_15EF2665_3106_0035_41AE_9BACA1A48D02",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 7"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Corredor lateral 3",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_090F5912_0779_E273_4161_B34234B8FA6A, 0, 0);; this.mainPlayList.set('selectedIndex', 23)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_15F5A318_3106_001C_41C5_9AA2EF2184CF",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 8"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Corredor lateral 4",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 23)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1203FDB8_3106_001C_41B6_C9BE8EDD0DA9",
 "layout": "horizontal",
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 9"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Corredor fundos",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_090E1912_0779_E273_4188_854245743B86, 0, 0);; this.mainPlayList.set('selectedIndex', 24)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_13D4FC1E_310A_0017_41BA_DDA6D071C1BA",
 "layout": "horizontal",
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Corredor fundos 2",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_090D5913_0779_E271_419A_08B82A4F2A6D, 0, 0);; this.mainPlayList.set('selectedIndex', 25)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_E967C45C_C9EE_B8F2_41E2_85972F42D0D4",
 "layout": "horizontal",
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Corredor fundos 3",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_090DA913_0779_E271_419D_101039656052, 0, 0);; this.mainPlayList.set('selectedIndex', 27)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_D9C39BE3_C9A6_EFD7_41E3_F4CEEE9ED4F5",
 "layout": "horizontal",
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "\u00c1rea de lazer",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 26)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_D8A2C02E_C9A7_F851_41BF_9B78417198F1",
 "layout": "horizontal",
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Vesti\u00e1rio",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 28)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverIconURL": "skin/Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1_rollover.png",
 "id": "Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1",
 "layout": "horizontal",
 "paddingLeft": 5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconURL": "skin/Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1.png",
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 30,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "rollOverFontFamily": "Oswald",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "rollOverFontSize": 18,
 "shadow": false,
 "label": "VOLTAR",
 "height": 50,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_15A14DDC_31FA_0014_41BE_C93192DD207E",
 "layout": "absolute",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "paddingRight": 0,
 "shadow": false,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "borderRadius": 0,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "id": "Container_15A16DDC_31FA_0014_4199_0FBF7553300D",
 "layout": "absolute",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "height": 8,
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_15A10DDC_31FA_0014_4185_021C898E177D",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Cozinha",
 "height": 36,
 "shadowBlurRadius": 15,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 3)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "rollOverShadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_15A13DDC_31FA_0014_41C5_41AE80876834",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Cozinha Gourmet",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 23,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 5)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_15A12DDC_31FA_0014_416B_ED845741AE5F",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "pressedLabel": "Lorem Ipsum",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lavanderia ",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 4)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_159EDDDC_31FA_0014_419A_61C18E43FE01",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Sala de estar ",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 8)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_159ECDDC_31FA_0014_41B9_2D5AB1021813",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lavabo",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 10)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverIconURL": "skin/Button_1757CD7D_31FA_0015_4143_A9E37B16A50B_rollover.png",
 "id": "Button_1757CD7D_31FA_0015_4143_A9E37B16A50B",
 "layout": "horizontal",
 "paddingLeft": 5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconURL": "skin/Button_1757CD7D_31FA_0015_4143_A9E37B16A50B.png",
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 30,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "rollOverFontFamily": "Oswald",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "rollOverFontSize": 18,
 "shadow": false,
 "label": "VOLTAR",
 "height": 50,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_17579D7D_31FA_0015_41A1_D2B94269F28D",
 "layout": "absolute",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "paddingRight": 0,
 "shadow": false,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "borderRadius": 0,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "id": "Container_17578D7D_31FA_0015_41BE_353D3005648A",
 "layout": "absolute",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "height": 8,
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1757AD7D_31FA_0015_41C7_FB79F56FA149",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Su\u00edte 1",
 "height": 36,
 "shadowBlurRadius": 15,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 12)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "rollOverShadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17565D7D_31FA_0015_4193_78BBCB2DC70F",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Banheiro su\u00edte 1",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 23,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 13)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17564D7D_31FA_0015_41B8_A9191CD56C52",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "pressedLabel": "Lorem Ipsum",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Su\u00edte 2",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 15)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17567D7D_31FA_0015_41C2_1E0D0AF05C7A",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Banheiro su\u00edte 2",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 16)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17566D7D_31FA_0015_41AD_98D7C60C694F",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Su\u00edte Master ",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 17)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17561D7D_31FA_0015_41B5_BD72FAC26B8B",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Closet su\u00edte master",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 18)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_E2225B25_C9FB_6852_41E0_F30DA3EE921A",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Banheiro su\u00edte master",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.mainPlayList.set('selectedIndex', 18); this.mainPlayList.set('selectedIndex', 19)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverIconURL": "skin/Button_175A5214_31FA_0014_4198_930DF49BADD9_rollover.png",
 "id": "Button_175A5214_31FA_0014_4198_930DF49BADD9",
 "layout": "horizontal",
 "paddingLeft": 5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconURL": "skin/Button_175A5214_31FA_0014_4198_930DF49BADD9.png",
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 30,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "rollOverFontFamily": "Oswald",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "rollOverFontSize": 18,
 "shadow": false,
 "label": "BACK",
 "height": 50,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_1758A215_31FA_0014_41B6_9A4A5384548B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_175A4215_31FA_0014_41B2_5B8676CC3F2F",
 "layout": "absolute",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "paddingRight": 0,
 "shadow": false,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "borderRadius": 0,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "id": "Container_1759B215_31FA_0014_41C0_84C99CBD5517",
 "layout": "absolute",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "height": 8,
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1759A215_31FA_0014_41C7_F6B1044E5BB3",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 15,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "rollOverShadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17598215_31FA_0014_41AC_1166AB319171",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 23,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1759F215_31FA_0014_41BD_BBFA5FB0D882",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "pressedLabel": "Lorem Ipsum",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1759D215_31FA_0014_41AD_B6C5744A0B97",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17593215_31FA_0014_41C0_42BAFB0080F0",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17592215_31FA_0014_41B2_AA3B5CC318B8",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17590215_31FA_0014_41C1_2B2D012DCC76",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 7"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17597215_31FA_0014_41C0_9BEE1DE4D7F6",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 8"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17596215_31FA_0014_41C6_A42670770708",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 9"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_1758B215_31FA_0014_41BC_C4EAC2A9544B",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverIconURL": "skin/Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C_rollover.png",
 "id": "Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C",
 "layout": "horizontal",
 "paddingLeft": 5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconURL": "skin/Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C.png",
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 30,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "rollOverFontFamily": "Oswald",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "rollOverFontSize": 18,
 "shadow": false,
 "label": "BACK",
 "height": 50,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_17EA92B7_3106_0014_41A6_2B88DF32BBA7",
 "layout": "absolute",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "paddingRight": 0,
 "shadow": false,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "borderRadius": 0,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "id": "Container_17EAA2B7_3106_0014_41B0_ACBB1485A79E",
 "layout": "absolute",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "height": 8,
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EAB2B7_3106_0014_41A7_209417AD3E9A",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 15,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "rollOverShadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EAD2B7_3106_0014_41C0_0B5453B4841D",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 23,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EAE2B7_3106_0014_41C7_DB7FC43AAEE0",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "pressedLabel": "Lorem Ipsum",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EB02B7_3106_0014_41AF_05D9AC36B189",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EB32B7_3106_0014_41C8_467BF6AECBE8",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EB42B7_3106_0014_41B0_CE70CBDDF438",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EB52B7_3106_0014_419C_439E593AEC43",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 7"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EB62B7_3106_0014_41C5_43B38271B353",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 8"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EB72B7_3106_0014_41B9_61857077BF4A",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 9"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_17EB92B7_3106_0014_41B2_34A3E3F63779",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverIconURL": "skin/Button_168CA310_3106_01EC_41C7_72CE0522951A_rollover.png",
 "id": "Button_168CA310_3106_01EC_41C7_72CE0522951A",
 "layout": "horizontal",
 "paddingLeft": 5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconURL": "skin/Button_168CA310_3106_01EC_41C7_72CE0522951A.png",
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 30,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "rollOverFontFamily": "Oswald",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "rollOverFontSize": 18,
 "shadow": false,
 "label": "BACK",
 "height": 50,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_168D8311_3106_01EC_41B0_F2D40886AB88, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_168C8310_3106_01EC_4187_B16F315A4A23",
 "layout": "absolute",
 "paddingLeft": 0,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 1,
 "paddingRight": 0,
 "shadow": false,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "borderRadius": 0,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "id": "Container_168D7310_3106_01EC_41BE_5FCBD9E27BE4",
 "layout": "absolute",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "paddingRight": 0,
 "shadow": false,
 "height": 8,
 "gap": 10,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168D6310_3106_01EC_41B8_A0B6BE627547",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 15,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "rollOverShadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168D5310_3106_01EC_41B5_96D9387401B8",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 23,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168D3310_3106_01EC_41AC_5D524E4677A5",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "pressedLabel": "Lorem Ipsum",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168D2310_3106_01EC_41B8_9D7D1B2B55FA",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168D0310_3106_01EC_41A1_FA8FC42E6FF3",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168DE310_3106_01EC_4192_6A9F468A0ADE",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168DD310_3106_01EC_4190_7815FA70349E",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 7"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168DB310_3106_01EC_41B2_3511AA5E40E1",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 8"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168DA310_3106_01EC_41BE_DF88732C2A28",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 9"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_168D9311_3106_01EC_41A8_3BD8769525D6",
 "layout": "horizontal",
 "paddingLeft": 10,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "iconHeight": 32,
 "fontSize": 18,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "width": "100%",
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "label": "Lorem Ipsum",
 "height": 36,
 "shadowBlurRadius": 6,
 "gap": 5,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "minHeight": 1,
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "class": "Button",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "normal"
},
{
 "propagateClick": false,
 "id": "Image_1E18723C_57F1_802D_41C5_8325536874A5",
 "paddingLeft": 0,
 "width": "25%",
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "left",
 "maxWidth": 200,
 "url": "skin/Image_1E18723C_57F1_802D_41C5_8325536874A5.jpg",
 "verticalAlign": "top",
 "paddingRight": 0,
 "shadow": false,
 "height": "100%",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "Image",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "maxHeight": 200,
 "data": {
  "name": "agent photo"
 }
},
{
 "propagateClick": false,
 "id": "HTMLText_1E18423C_57F1_802D_41C4_458DB7F892AC",
 "paddingLeft": 10,
 "scrollBarColor": "#04A3E1",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": "75%",
 "scrollBarMargin": 2,
 "paddingRight": 10,
 "shadow": false,
 "height": "100%",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "HTMLText",
 "paddingBottom": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:2.58vh;font-family:'Oswald';\"><B><I>JOHN DOE</I></B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.29vh;font-family:'Oswald';\"><I>Licensed Real Estate Salesperson</I></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.86vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.86vh;font-family:'Oswald';\"><I>Tlf.: +11 111 111 111</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.86vh;font-family:'Oswald';\"><I>jhondoe@realestate.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.86vh;font-family:'Oswald';\"><I>www.loremipsum.com</I></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.86vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.86vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.86vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText19460"
 },
 "scrollBarWidth": 10
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "id": "IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83",
 "paddingLeft": 0,
 "width": 44,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "maxWidth": 101,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83.png",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "height": 44,
 "rollOverIconURL": "skin/IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83_rollover.png",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "maxHeight": 101,
 "data": {
  "name": "IconButton Thumblist"
 },
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "id": "IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F",
 "paddingLeft": 0,
 "width": 44,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "maxWidth": 101,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F.png",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, null, null, false)",
 "height": 44,
 "rollOverIconURL": "skin/IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F_rollover.png",
 "minHeight": 1,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "maxHeight": 101,
 "data": {
  "name": "IconButton Location"
 },
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "id": "IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F",
 "paddingLeft": 0,
 "width": 50,
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "maxWidth": 101,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F.png",
 "paddingRight": 0,
 "mode": "push",
 "shadow": false,
 "height": 50,
 "minHeight": 1,
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F_pressed.png",
 "visible": false,
 "maxHeight": 101,
 "data": {
  "name": "IconButton --"
 },
 "cursor": "hand"
}]
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
