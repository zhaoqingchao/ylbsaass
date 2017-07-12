function initJoint(domid) {

    joint.setTheme('modern');

    // Extend the Orgchart member markup with control buttons.
    joint.shapes.org.Member.prototype.markup = [
        '<g class="rotatable">',
        '    <g class="scalable">',
        '        <rect class="mycard"/>',
        '    </g>',
        '    <text class="myname"/>',
        '</g>'
    ].join('');

    // A helper to create a member model
    var member = function(name, level, keyId, keyParentId) {

        var textColor = "#666";
        var background = "#d4e8ff";

        var element = new joint.shapes.org.Member({
            size: {
                width: 240,
                height: 140
            },
            attrs: {
                '.mycard': {
                    fill: background,
                    'stroke-width': 0,
                    rx: 3,
                    ry: 3
                },
                '.myname': {
                    fill: textColor,
                    text: '',
                    'font-family': 'Arial',
                    'font-size': 22,
                    x: 20,
                    y: 30,
                    // 'text-anchor': 'end',
                    transform: 'translate(0, 30)'
                }
            }
        }).on({
            'change:name': function(cell, name) {
                var t1 = joint.util.breakText(name, { width: 210 }, cell.attr('.myname'));
                cell.attr('.myname/text', t1 +'\n等级:'+level);
            }
        }).set({
            name: name,
        });


        element.keyId = keyId;
        element.keyParentId = keyParentId;
        return element;
    };

    // A helper to create an arrow connection
    function link(source, target) {
        return new joint.shapes.org.Arrow({
            source: {
                id: source.id
            },
            target: {
                id: target.id
            },
            attrs: {
                '.connection': {
                    stroke: '#dadbdd',
                    "stroke-width": 10
                },
                // '.marker-source': { fill: 'red', d: 'M 10 0 L 0 5 L 10 10 z' },
                // '.marker-target': { fill: 'yellow', d: 'M 10 0 L 0 5 L 10 10 z' }
            },
        });
    }

    var members = [
        // member('Founder & Chairman', 'Pierre Omidyar', 'images/male.png', '#31d0c6'),
        // member('President & CEO', 'Margaret C. Whitman', 'images/female.png', '#31d0c6'),
        // member('President, PayPal', 'Scott Thompson', 'images/male.png', '#7c68fc'),
        // member('President, Ebay Global Marketplaces' , 'Devin Wenig', 'images/male.png', '#7c68fc'),
        // member('Senior Vice President Human Resources', 'Jeffrey S. Skoll', 'images/male.png', '#fe854f'),
        // member('Senior Vice President Controller', 'Steven P. Westly', 'images/male.png', '#feb663')
    ];

    var connections = [
        // link(members[0], members[1]),
        // link(members[1], members[2]),
        // link(members[1], members[3]),
        // link(members[1], members[4]),
        // link(members[1], members[5])
    ];

    var graph = new joint.dia.Graph();
    var paper = new joint.dia.Paper({
        model: graph,
        width: 1,
        height: 1,
        gridSize: 1,
        defaultLink: new joint.shapes.org.Arrow()
    });

    var paperScroller = new joint.ui.PaperScroller({
        paper: paper,
        autoResizePaper: true
    });

    var treeLayout = new joint.layout.TreeLayout({
        graph: graph,
        parentGap: 60,
        direction: 'B'
    });

    paperScroller.$el.css({
        width: '100%',
        height: '100%'
    }).appendTo(domid);

    // 初始显示
    // graph.resetCells(members.concat(connections));
    // treeLayout.layout();

    paperScroller.zoom(-0.2);
    paperScroller.centerContent();

    paper.on('blank:pointerdown', paperScroller.startPanning);
    // paper.on('element:pointerup', function(elementView, evt, x, y) {

    //     if (V(evt.target).hasClass('add')) {

    //         // Adding a new member
    //         var newMember = member('Employee', 'New Employee', 'images/female.png', '#c6c7e2');
    //         var newConnection = link(elementView.model, newMember);
    //         graph.addCells([newMember, newConnection]);
    //         treeLayout.layout();

    //     } else if (V(evt.target).hasClass('del')) {

    //         // A member removal
    //         elementView.model.remove();
    //         treeLayout.layout();

    //     } else if (V(evt.target).hasClass('edit')) {

    //         // A member edit
    //         var inspector = new joint.ui.Inspector({
    //             cellView: elementView,
    //             live: false,
    //             inputs: {
    //                 'rank': {
    //                     type: 'text',
    //                     label: 'Rank',
    //                     index: 1
    //                 },
    //                 'name': {
    //                     type: 'text',
    //                     label: 'Name',
    //                     index: 2
    //                 },
    //                 'attrs/image/xlink:href': {
    //                     type: 'select-box',
    //                     target: '.joint-dialog .fg',
    //                     width: 210,
    //                     label: 'Sex',
    //                     options: [{
    //                         value: 'images/male.png',
    //                         content: 'Male'
    //                     }, {
    //                         value: 'images/female.png',
    //                         content: 'Female'
    //                     }],
    //                     index: 3
    //                 },
    //                 'attrs/.card/fill': {
    //                     type: 'color-palette',
    //                     target: '.joint-dialog .fg',
    //                     label: 'Color',
    //                     index: 4,
    //                     options: [{
    //                         content: '#31d0c6'
    //                     }, {
    //                         content: '#7c68fc'
    //                     }, {
    //                         content: '#fe854f'
    //                     }, {
    //                         content: '#feb663'
    //                     }, {
    //                         content: '#c6c7e2'
    //                     }]
    //                 }
    //             }
    //         });

    //         var dialog = new joint.ui.Dialog({
    //             type: 'inspector-dialog',
    //             width: 250,
    //             title: 'Edit Member',
    //             closeButton: false,
    //             content: inspector.render().el,
    //             buttons: [{
    //                 content: 'Cancel',
    //                 action: 'cancel'
    //             }, {
    //                 content: 'Apply',
    //                 action: 'apply'
    //             }]
    //         });

    //         dialog.on({
    //             'action:cancel': function() {
    //                 inspector.remove();
    //                 dialog.close();
    //             },
    //             'action:apply': function() {
    //                 inspector.updateCell();
    //                 inspector.remove();
    //                 dialog.close();
    //             }
    //         });
    //         dialog.open();
    //     }
    // });

    // Tree Layout Rank Selection
    // var directionPicker = new joint.ui.SelectBox({
    //     width: 150,
    //     options: [{
    //         value: 'L',
    //         content: 'Right-Left'
    //     }, {
    //         value: 'R',
    //         content: 'Left-Right',
    //         selected: true
    //     }, {
    //         value: 'T',
    //         content: 'Bottom-Top'
    //     }, {
    //         value: 'B',
    //         content: 'Top-Bottom'
    //     }]
    // });

    // directionPicker.on('option:select', function(option) {
    //     _.invoke(graph.getElements(), 'set', 'direction', option.value);
    //     treeLayout.layout();
    //     paperScroller.centerContent();
    // });

    // directionPicker.render().$el.appendTo('#orgchart-direction');

    new joint.ui.TreeLayoutView({
        paper: paper,
        model: treeLayout,
        previewAttrs: {
            parent: {
                rx: 10,
                ry: 10
            }
        },
        canInteract: function(element){
            return false;
        }
    });



    /**
     * 批量添加数据
     * @param {Array} data  数据列表 [{keyId:1,name:'xxx',keyParentId:0}, {keyId:2,name:'yyy',keyParentId:1}]
     */
    var addCellList = function(data) {
        members = [];
        connections = [];

        for (var i = 0; i < data.length; i++) {
            var user = data[i];
            var m = member(user.name,  user.agent_level, user.keyId, user.keyParentId);
            members.push(m);
        }
        for (var i = 1; i < data.length; i++) {
            var user = data[i];
            var m = members[i];
            var pm = arrayGetItemByKey(members, 'keyId', m.keyParentId);
            // console.log(m.keyParentId, '---->',pm.attributes.name);
            if (pm) {
                connections.push(link(pm, m));
            }
        }
        graph.resetCells(members.concat(connections));
        treeLayout.layout();
    };

    return {
        graph: graph,
        addCellList: addCellList
    };
}
