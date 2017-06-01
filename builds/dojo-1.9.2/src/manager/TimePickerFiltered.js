require(["dojo/_base/declare",
    "dijit/_TimePicker"
    ],function(declare, _TimePicker){
        return declare("Manager.TimePickerFiltered",[_TimePicker], {

            _getFilteredNodes: function (/*number*/start, /*number*/maxNum, /*Boolean*/before) {
                // summary:
                //      Returns an array of nodes with the filter applied.  At most maxNum nodes
                //      will be returned - but fewer may be returned as well.  If the
                //      before parameter is set to true, then it will return the elements
                //      before the given index
                // tags:
                //      private
                var nodes = [], n, i = start, max = this._maxIncrement + Math.abs(i),
                chk = before ? -1 : 1, dec = before ? 1 : 0, inc = before ? 0 : 1;
                do {
                    i = i - dec;
                    var date = new Date(this._refDate);
                    var incrementDate = this._clickableIncrementDate;
                    date.setHours(date.getHours() + incrementDate.getHours() * i,
                        date.getMinutes() + incrementDate.getMinutes() * i,
                        date.getSeconds() + incrementDate.getSeconds() * i);
                    if (!this.isDisabledDate(date)) {
                        n = this._createOption(i);
                        if (n) {
                            nodes.push(n);
                        }
                    }
                    i = i + inc;
                } while (nodes.length < maxNum && (i * chk) < max);
                if (before) {
                    nodes.reverse();
                }
                return nodes;
            }

        });
    });
