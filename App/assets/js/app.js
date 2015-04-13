/*
   This file is a part of Proton (https://github.com/LestaD/Proton)

   Copyright 2015 © LestaD (Sergey Sova) <i.am@lestad.net>                                                                                              
                                                                                                              
   Licensed under the Apache License, Version 2.0 (the "License");                                            
   you may not use this file except in compliance with the License.                                           
   You may obtain a copy of the License at                                                                    
                                                                                                              
       http://www.apache.org/licenses/LICENSE-2.0                                                             
                                                                                                              
   Unless required by applicable law or agreed to in writing, software                                        
   distributed under the License is distributed on an "AS IS" BASIS,                                          
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                   
   See the License for the specific language governing permissions and                                        
   limitations under the License.
*/

var __menuList = [
  {
    name: 'catalog',
    title: 'Каталог',
    items: [
      {
        name: 'opencatalog',
        title: 'Открыть список приложений',
        click: function(){},
      },
      {
        name: 'categories',
        title: 'Категории',
        click: function(){}
      },
      {
        type: 'separator'
      },
      {
        name: 'utilites',
        title: 'Утилиты',
        click: function(){}
      },
      {
        name: 'musical',
        title: 'Музыка',
        click: function(){}
      },
      {
        type: 'separator',
      },
      {
        name: 'installed',
        title: 'Установленные',
        click: function(){}
      }
    ]
  },
  {
    name: 'profile',
    title: 'Профиль',
    items: [
     {
      name: 'register',
      title: 'Зарегистрироваться',
      click: function(){
        require('nw.gui').Shell.openExternal('http://proton.lestad.net/register')
      },
      visible: (true)
     },
     {
      name: 'openprofile',
      title: '{login}',
      click: function(){},
      visible: (false)
     },
    ]
  },
  {
    name: 'help',
    title: 'Справка',
    items: [
      {
        name: 'about',
        title: 'О Proton',
        icon: 'tray@2x.png'
      },
      {
        type: 'separator'
      },
      {
        name: 'helpme',
        title: 'Документация',
        click: function(){
          require('nw.gui').Shell.openExternal('http://proton.lestad.net/help');
        }
      }
    ]
  }
];

/**
 * 
 * @param  {Array} json  Array of menu items
 * @param  {gui.Menu} menu 
 * @return {gui.Menu}
 */
function createMenu(json, menu) {
  var gui = require('nw.gui');

  for (var i in json) {
    var top = json[i];
    if (top.visible === false) continue;

    if (typeof top.title !== "string" && (!top.type || top.type === "normal") ) {
      throw new Error('Menu item must has `title`');
    }
    
    var __item = {label: top.title};
    if (top.type) {
      __item.type = top.type;
    }
    if (top.click) {
      __item.click = top.click;
    }
    if (top.icon) {
      __item.icon = top.icon;
    }

    var item = new gui.MenuItem(__item);
    if (top.items && top.items.length > 0) {
      item.submenu = new gui.Menu({type: 'contextmenu'});
      item.submenu = createMenu(top.items, item.submenu);
    }

    menu.append(item);
  }
  return menu;
}


(function() {
  var
  gui = require('nw.gui'),
  win = require('nw.gui').Window.get(),
  platform = require('os').platform,
  fs = require('fs'),
  path = require('path');

  {
    var menubar = new gui.Menu({type: "menubar"});
    menubar.createMacBuiltin("Proton", {hideEdit: true, hideWindow: true});
    menubar = createMenu(__menuList, menubar);
    menubar.items[0].submenu = createMenu([{
      title: 'LestaD.net',
      click: function() {
        gui.Shell.openExternal('http://lestad.net')
      }
    }], menubar.items[0].submenu);
    gui.Window.get().menu = menubar;
  }
 
}).call(this);
