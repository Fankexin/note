var $note = $('#note');

var writeBox = new WriteBox();
var $writeBox = writeBox.init();
var dlgFont = new DlgFont(writeBox);
var $dlgFont = dlgFont.init();

var menu = [
    {
        title: '文件(F)',
        menuItems: [
            {
                title: '新建(N)',
                shortcut: 'Ctrl+N',
                dark: true
            },
            {
                title: '打开(O)...',
                shortcut: 'Ctrl+O',
                dark: true
            },
            {
                title: '保存(S)',
                shortcut: 'Ctrl+S',
                dark: true
            },
            {
                title: '另存为(A)...',
                shortcut: 'Ctrl+Shift+S',
                dark: true
            },
            {
                title: 'hr',
                shortcut: '',
                dark: true
            },
            {
                title: '页面设置(U)...',
                shortcut: '',
                dark: true
            },
            {
                title: '打印(P)...',
                shortcut: 'Ctrl+P',
                dark: true
            },
            {
                title: 'hr',
                shortcut: '',
                dark: true
            },
            {
                title: '退出(X)',
                shortcut: '',
                dark: true
            }
        ],
        width: '202px'
    },
    {
        title: '编辑(E)',
        menuItems: [
            {
                title: '撤销(U)',
                shortcut: 'Ctrl+Z',
                dark: false
            },
            {
                title: 'hr',
                shortcut: '',
                dark: true
            },
            {
                title: '剪切(T)',
                shortcut: 'Ctrl+X',
                dark: true
            },
            {
                title: '复制(C)',
                shortcut: 'Ctrl+C',
                dark: false
            },
            {
                title: '粘贴(P)',
                shortcut: 'Ctrl+V',
                dark: false
            },
            {
                title: '删除(L)',
                shortcut: 'Del',
                dark: false
            },
            {
                title: 'hr',
                shortcut: '',
                dark: true
            },
            {
                title: '使用 Bing 搜索...',
                shortcut: 'Ctrl+E',
                dark: true
            },
            {
                title: '查找(F)...',
                shortcut: 'Ctrl+F',
                dark: false
            },
            {
                title: '查找下一个(N)',
                shortcut: 'F3',
                dark: false
            },
            {
                title: '替换(R)...',
                shortcut: 'Ctrl+H',
                dark: true
            },
            {
                title: '转到(G)...',
                shortcut: 'Ctrl+G',
                dark: false
            },
            {
                title: 'hr',
                shortcut: '',
                dark: true
            },
            {
                title: '全选(A)',
                shortcut: 'Ctrl+A',
                dark: true
            },
            {
                title: '时间/日期(D)',
                shortcut: 'F5',
                dark: true
            },
        ],
        width: '218px'
    },
    {
        title: '格式(O)',
        menuItems: [
            {
                title: '自动换行(W)',
                shortcut: '',
                dark: true
            },
            {
                title: '字体(F)...',
                shortcut: '',
                dark: true,
                fun: dlgFont.open.bind(dlgFont)
            }
        ],
        width: '156px'
    },
    {
        title: '查看(V)',
        menuItems: [
            {
                title: '缩放(Z)',
                shortcut: '',
                dark: true
            },
            {
                title: '状态栏(S)',
                shortcut: '',
                dark: true
            }
        ],
        width: '138px'
    },
    {
        title: '帮助(H)',
        menuItems: [
            {
                title: '查看帮助(H)',
                shortcut: '',
                dark: true
            },
            {
                title: '发送反馈(F)',
                shortcut: '',
                dark: true
            },
            {
                title: 'hr',
                shortcut: '',
                dark: true
            },
            {
                title: '关于记事本(A)',
                shortcut: '',
                dark: true
            },
        ],
        width: '166px'
    }
];

var menubar = new Menubar();
var $menubar = menubar.init();
function Menubar() {
    this.$menubar = null;
    this.$menus = [];

    this.init = function () {
        var $menubar = $('<div class="menubar"></div>');
        var $menu_title = $('<ul class="menu_title">');
        for (var i = 0; i < menu.length; i++) {
            var $li = $(`<li>${menu[i].title}</li>`);
            $li.click(this.showMenu.bind(this, i));
            $li.mouseover(this.showMenu.bind(this, i));
            $menu_title.append($li);
        }
        $menubar.append($menu_title);
        for (var i = 0; i < menu.length; i++) {
            var $menu = $('<ul class="menu"></ul>');
            for (var j = 0; j < menu[i].menuItems.length; j++) {
                if (menu[i].menuItems[j].title == 'hr') {
                    var $menu_item = $('<li class="menu_hr"></li>');
                } else {
                    if (menu[i].menuItems[j].dark) {
                        var $menu_item = $(`<li class="menu_item">${menu[i].menuItems[j].title}<span class="shortcut">${menu[i].menuItems[j].shortcut}</span></li>`);
                    }
                    else {
                        var $menu_item = $(`<li class="menu_item-no">${menu[i].menuItems[j].title}<span class="shortcut-no">${menu[i].menuItems[j].shortcut}</span></li>`);
                    }
                    if (menu[i].menuItems[j].fun) {
                        $menu_item.click(menu[i].menuItems[j].fun);
                    }
                }
                $menu.append($menu_item);
            }
            $menu.css('width', menu[i].width);
            $menu.css('left', 62 * i);
            $menubar.append($menu);
            this.$menus.push($menu);
        }
        this.$menubar = $menubar;
        return $menubar;
    };

    this.openMenu = -1;
    this.showMenu = function (index, e) {
        e.stopPropagation();
        if (e.type == 'click' && this.openMenu > -1) {
            this.hideMenu();
        } else if (e.type == 'click' || this.openMenu > -1) {
            this.openMenu = index;
            for (var i = 0; i < this.$menus.length; i++) {
                if (i == index) {
                    this.$menus[i].addClass('active');
                } else {
                    this.$menus[i].removeClass('active');
                }
            }
        }
    };

    this.hideMenu = function () {
        this.openMenu = -1;
        for (var i = 0; i < this.$menus.length; i++) {
            this.$menus[i].removeClass('active');
        }
    };
}
$note.append($menubar);


function WriteBox() {
    this.$writeBox = $('<div class="editor"></div>');
    this.$textarea = $('<textarea spellcheck="false" auto-size="none" wrap="off"></textarea>');
    this.init = function () {
        this.$writeBox.append(this.$textarea);
        return this.$writeBox;
    };

}
$note.append($writeBox);

$note.after($dlgFont);
function DlgFont(writeBox) {
    this.writeBox = writeBox;
    this.$textarea = writeBox.$textarea;
    this.$dlg_font = null;
    this.$select_box_inputs = [];
    this.$select_box_item_lis = [[], [], []];
    this.$sample_p = $('<p>AaBbYyZz</p>');
    this.nowSelect = [0, 0, 0];
    this.newSelect = [0, 0, 0];
    this.fonts = ['Agency FB', 'Algerian', 'Arial', 'Arial Rounded MT', 'Axure Handwriting', 'Bahnschrift', 'Baskerville Old Face', 'Bauhaus 93', 'Bell MT', 'Berlin Sans FB', 'Bernard MT', 'BlackAdder ITC'],
    this.styles = ['常规', '斜体', '粗体', '粗偏斜体'],
    this.sizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];
    this.init = function () {
        var selectBoxData = [
            {
                title: '字体(F):',
                ul: this.fonts,
                default: 2
            },
            {
                title: '字形(Y):',
                ul: this.styles,
                default: 0
            },
            {
                title: '大小(S):',
                ul: this.sizes,
                default: 6
            }
        ];

        var $dlg_font = $('<div class="dlg_font"></div>');
        var $dlg_font_box = $('<div class="dlg_font_box"></div>');
        var $header = $('<div class="header"></div>');
        var $fff = $('<div>字体</div>');
        var $xxx = $('<div>X</div>');
        $xxx.click(this.close.bind(this));
        $header.append($fff);
        $header.append($xxx);
        $header.mousedown(function (mousedown_e) {
            var top = $dlg_font_box.position().top;
            var left = $dlg_font_box.position().left;
            if (mousedown_e.button == 0) {
                $dlg_font.mousemove(function (mousemove_e) {
                    $dlg_font_box.css('left', mousemove_e.pageX - mousedown_e.pageX + left + 'px');
                    $dlg_font_box.css('top', mousemove_e.pageY - mousedown_e.pageY + top + 'px');
                });
                $dlg_font.mouseup(function () {
                    $dlg_font.off('mousemove');
                    $dlg_font.off('mouseup');
                });
            }
        });
        $dlg_font_box.append($header);
        var $body = $('<div class="body"></div>');
        var $select_box = $('<div class="select_box"></div>');
        for (var i = 0; i < selectBoxData.length; i++) {
            var $select_box_item_span = $(`<span>${selectBoxData[i].title}</span>`);
            var $select_box_item_input = $('<input type="text">');
            var $select_box_item_ul = $('<ul></ul>');
            for (var j = 0; j < selectBoxData[i].ul.length; j++) {
                var $li = $(`<li>${selectBoxData[i].ul[j]}</li>`);
                if (i == 0) {
                    $li.css('font-family', selectBoxData[i].ul[j]);
                } else if (i == 1) {
                    this.changeStyle($li, j);
                }
                $li.click(this.selectLi.bind(this, i, j));
                this.$select_box_item_lis[i].push($li);
                $select_box_item_ul.append($li);
            }
            this.$select_box_inputs.push($select_box_item_input);
            this.selectLi(i, selectBoxData[i].default);
            $select_box.append($select_box_item_span);
            $select_box.append($select_box_item_input);
            $select_box.append($select_box_item_ul);
        }
        this.selectSave();
        var $sample = $('<fieldset class="sample"></fieldset>');
        $sample.append($('<legend>示例</legend>'));
        var $sample_p = this.$sample_p;
        $sample.append($sample_p);
        var $script = $('<div class="script"></div>');
        $script.append($('<span>脚本(R):</span><br>'));
        var $select = $('<select></select>');
        $select.append($('<option value="西欧语言">西欧语言</option>'));
        $select.append($('<option value="中文 GB2312">中文 GB2312</option>'));
        $script.append($select);
        var $btn_ok = $('<input type="button" value="确定" class="btn_ok">');
        var $btn_cancel = $('<input type="button" value="取消" class="btn_cancel">');
        $btn_ok.click(function () {
            this.selectSave();
            this.close();
        }.bind(this));
        $btn_cancel.click(this.close.bind(this));
        $body.append($select_box);
        $body.append($sample);
        $body.append($script);
        $body.append($btn_ok);
        $body.append($btn_cancel);

        $dlg_font_box.append($body);
        $dlg_font.append($dlg_font_box);
        this.$dlg_font = $dlg_font;
        return $dlg_font;
    };
    this.selectLi = function (i, j) {
        for (var k = 0; k < this.$select_box_item_lis[i].length; k++) {
            if (k == j) {
                this.$select_box_item_lis[i][k].addClass('selected');
            } else {
                this.$select_box_item_lis[i][k].removeClass('selected');
            }
        }
        this.newSelect[i] = j;
        if (i == 0) {
            this.$select_box_inputs[i].val(this.fonts[j]);
            this.$sample_p.css('font-family', this.fonts[j]);
        } else if (i == 1) {
            this.$select_box_inputs[i].val(this.styles[j]);
            this.changeStyle(this.$sample_p, j);
        } else if (i == 2) {
            this.$select_box_inputs[i].val(this.sizes[j]);
            this.$sample_p.css('font-size', this.sizes[j] + 'px');
        }
    };
    this.changeStyle = function ($node, i) {
        if (i == 0) {
            $node.css('font-style', 'normal');
            $node.css('font-weight', 'normal');
        } else if (i == 1) {
            $node.css('font-style', 'italic');
            $node.css('font-weight', 'normal');
        } else if (i == 2) {
            $node.css('font-style', 'normal');
            $node.css('font-weight', 'bold');
        } else if (i == 3) {
            $node.css('font-style', 'italic');
            $node.css('font-weight', 'bold');
        }
    };
    this.selectSave = function () {
        var newSelect = this.newSelect;
        this.nowSelect = newSelect;
        this.$textarea.css('font-family', this.fonts[newSelect[0]]);
        this.changeStyle(this.$textarea, newSelect[1]);
        this.$textarea.css('font-size', this.sizes[newSelect[2]] + 'px');
    };
    this.open = function () {
        this.$dlg_font.addClass('show');
    };
    this.close = function () {
        this.$dlg_font.removeClass('show');
    };
}
$note.click(menubar.hideMenu.bind(menubar));