define("manager/Patches", [
    "dojo/_base/declare",
    "dojo/cldr/supplemental"
    ], function(declare,supplemental ) {
        return declare("Manager.Patches",[],{
            constructor: function() {
                // --------------------------------------------------------------------------------
                // dojoroot\dojo\cldr\supplemental.js
                // --------------------------------------------------------------------------------
                // metodo: dojo.cldr.supplemental.getFirstDayOfWeek=function(_1)
                // - obtem o numero do primeiro dia da semana
                // - patch: acrescentado br:0 para o calendario come�ar no domingo
                supplemental.getFirstDayOfWeek = function(/*String?*/locale){
                    // summary: Returns a zero-based index for first day of the week
                    // description:
                    //		Returns a zero-based index for first day of the week, as used by the local (Gregorian) calendar.
                    //		e.g. Sunday (returns 0), or Monday (returns 1)

                    // from http://www.unicode.org/cldr/data/common/supplemental/supplementalData.xml:supplementalData/weekData/firstDay
                    var firstDay = {/*default is 1=Monday*/
                        mv:5,
                        br:0,
                        ae:6,
                        af:6,
                        bh:6,
                        dj:6,
                        dz:6,
                        eg:6,
                        er:6,
                        et:6,
                        iq:6,
                        ir:6,
                        jo:6,
                        ke:6,
                        kw:6,
                        ly:6,
                        ma:6,
                        om:6,
                        qa:6,
                        sa:6,
                        sd:6,
                        so:6,
                        sy:6,
                        tn:6,
                        ye:6,
                        ar:0,
                        as:0,
                        az:0,
                        bw:0,
                        ca:0,
                        cn:0,
                        fo:0,
                        ge:0,
                        gl:0,
                        gu:0,
                        hk:0,
                        il:0,
                        'in':0,
                        jm:0,
                        jp:0,
                        kg:0,
                        kr:0,
                        la:0,
                        mh:0,
                        mn:0,
                        mo:0,
                        mp:0,
                        mt:0,
                        nz:0,
                        ph:0,
                        pk:0,
                        sg:0,
                        th:0,
                        tt:0,
                        tw:0,
                        um:0,
                        us:0,
                        uz:0,
                        vi:0,
                        zw:0
                    // variant. do not use?		gb:0,
                    };

                    var country = supplemental._region(locale);
                    var dow = firstDay[country];
                    return (dow === undefined) ? 1 : dow; /*Number*/
                };
            }
        });
    });
