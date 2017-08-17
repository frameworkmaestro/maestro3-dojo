
require(["dojox/validate/_base","dojo/_base/lang","dijit/registry"], function(validate, lang, registry) {
    Manager.Validate = {
        isValidCpf: function(/*String*/value, idField){
            // summary:
            //		Validates a CPF number
            //
            // value: String
            //		The CPF number in #########-## or ###########,
            //		format
            
            var field = registry.byId(idField);
            if (field) {
                if (!field.required && (field._isEmpty(value) || (value == '___.___.___-__'))) {
                    return true;
                }
            }
            if(!lang.isString(value)){
                if(!value){
                    return false;
                }
                value = value + "";
                while(value.length < 11){
                    value = "0" + value;
                }
            }
            var flags = {
                format: [
                "###.###.###-##",
                "#########-##",
                "###########"
                ]
            };
            if(validate.isNumberFormat(value, flags)){
                // Matched the initial test, so break this down into the
                // parts to be validated.
                value = value.replace("-", "").replace(/\./g, "");
                var cpf = [];
                var dv = [];
                var i, j, tmp;

                // Check for obvious bad combos
                // all 0s to all 9's.
                for(i = 0; i < 10; i++){
                    tmp = "";
                    for(j = 0; j < value.length; j++){
                        tmp += "" + i;
                    }
                    if(value === tmp){
                        return false;
                    }
                }

                //Split out the DV from the main number.
                for(i = 0; i < 9; i++){
                    cpf.push(parseInt(value.charAt(i), 10));
                }
                for(i = 9; i < 12; i++){
                    dv.push(parseInt(value.charAt(i), 10));
                }

                var base = [10,9,8,7,6,5,4,3,2];
                var sum = 0;
                for(i = 0; i < cpf.length; i++){
                    sum += cpf[i] * base[i];
                }
                var dv0 = (sum % 11) < 2 ? 0 : 11 - (sum % 11);

                if(dv0 == dv[0]){
                    // Still seems valid, keep going.
                    sum = 0;
                    base = [11,10,9,8,7,6,5,4,3,2];

                    cpf.push(dv0);
                    for(i = 0; i < cpf.length; i++){
                        sum += cpf[i] * base[i];
                    }
                    var dv1 = (sum % 11) < 2 ? 0 : 11 - (sum % 11)
                    if(dv1 === dv[1]){
                        // Whew, looks valid.
                        return true;
                    }
                }
            }
            if(value.slice(-2)==='YY')
                return true;
            return false;
        },
        
        isValidCnpj: function(/*String*/value, idField){
            // summary:
            //		Validates a CNPJ/CGC number
            //
            // value: String
            //		The CNPJ/CGC number in ##.###.###/####-##, ########/####-##,
            //		############-## or ############## format
            var field = registry.byId(idField);
            console.log(value);
            if (field) {
                if (!field.required && (field._isEmpty(value) || (value == '__.___.___/____-__'))) {
                    return true;
                }
            }
            if(!lang.isString(value)){
                if(!value){
                    return false;
                }
                value = value + "";
                while(value.length < 14){
                    value = "0" + value;
                }
            }
            var flags = {
                format: [
                "##.###.###/####-##",
                "########/####-##",
                "############-##",
                "##############"
                ]
            };
            if(validate.isNumberFormat(value, flags)){
                // Matched the initial test, so break this down into the
                // parts to be validated.
                value = value.replace("/", "").replace(/\./g, "").replace("-", "");
                var cgc = [];
                var dv = [];
                var i, j, tmp;

                // Check for obvious bad combos
                // all 0s to all 9's.
                for(i = 0; i < 10; i++){
                    tmp = "";
                    for(j = 0; j < value.length; j++){
                        tmp += "" + i;
                    }
                    if(value === tmp){
                        return false;
                    }
                }

                //Split out the DV from the main number.
                for(i = 0; i < 12; i++){
                    cgc.push(parseInt(value.charAt(i), 10));
                }
                for(i = 12; i < 14; i++){
                    dv.push(parseInt(value.charAt(i), 10));
                }
		
                var base = [5,4,3,2,9,8,7,6,5,4,3,2];
                var sum = 0;
                for(i = 0; i < cgc.length; i++){
                    sum += cgc[i] * base[i];
                }
                var dv0 = (sum % 11) < 2 ? 0 : 11 - (sum % 11);
                if(dv0 == dv[0]){
                    // Still seems valid, keep going.
                    sum = 0;
                    base = [6,5,4,3,2,9,8,7,6,5,4,3,2];
                    cgc.push(dv0);
                    for(i = 0; i < cgc.length; i++){
                        sum += cgc[i] * base[i];
                    }
                    var dv1 = (sum % 11) < 2 ? 0 : 11 - (sum % 11);
                    if(dv1 === dv[1]){
                        // Whew, looks valid.
                        
                        return true;
                    }
                }
            }
        },
        isValidNIT: function(/*String*/value, idField){
            // summary:
            //		Validates a NIT/PIS/PASEP number
            //
            // value: String
            //		The NIT/PIS/PASEP number in ###.#####.##-# or ############# format            
            var field = registry.byId(idField);
            
            if (field) {
                if (!field.required && (field._isEmpty(value) || (value == '___._____.__-_'))) {
                    return true;
                }
            }            
            if(!lang.isString(value)){                
                if(!value){
                    return false;
                }
                value = value + "";
                while(value.length < 14){
                    value = "0" + value;
                }
            }
            var flags = {
                format: [
                "###.#####.##-#",
                "###########"
                ]
            };
            if(validate.isNumberFormat(value, flags)){
                // Matched the initial test, so break this down into the
                // parts to be validated.
                value = value.replace(/\./g, "").replace("-", "");
                var nit = [];
                var dv = [];
                var i, j, tmp;

                // Check for obvious bad combos
                // all 0s to all 9's.
                for(i = 0; i < 11; i++){
                    tmp = "";
                    for(j = 0; j < value.length; j++){
                        tmp += "" + i;
                    }
                    if(value === tmp){
                        return false;
                    }
                }

                //Split out the DV from the main number.
                for(i = 0; i < 10; i++){
                    nit.push(parseInt(value.charAt(i), 10));
                }
                for(i = 10; i < 11; i++){
                    dv.push(parseInt(value.charAt(i), 10));
                }

                var base = [3,2,9,8,7,6,5,4,3,2];
                var sum = 0;
                for(i = 0; i < nit.length; i++){
                    sum += nit[i] * base[i];
                }
                var dv0 = 11 - (sum % 11);
                if ((dv0 == 10) || (dv0 ==11))
                {
                    dv0 = 0;
                }
                if(dv0 == dv[0]){
                    // Whew, looks valid.
                    return true;
                }
            }
            return false;
        }
    }

});


