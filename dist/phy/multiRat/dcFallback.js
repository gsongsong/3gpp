"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var combinatorics = require("js-combinatorics");
var caCommon_1 = require("../caCommon");
var caFallback_1 = require("../eUtra/caFallback");
var caFallback_2 = require("../nr/caFallback");
function removeNullInCombos(combos) {
    for (var i = 0; i < combos.length; i++) {
        combos[i] = combos[i].filter(function (ccConfig) { return ccConfig !== null; });
    }
    for (var i = combos.length - 1; i >= 0; i--) {
        if (!combos[i].length) {
            combos.splice(i, 1);
        }
    }
}
if (require.main === module) {
    var argv = process.argv;
    var dcConfig = argv[2];
    process.stdout.write('Original input\n');
    process.stdout.write(dcConfig + "\n");
    process.stdout.write('\n');
    var _a = dcConfig.replace('DC_', '').split('_'), caConfigLte = _a[0], caConfigNr = _a[1];
    var ccConfigLteArr = caConfigLte.split('-')
        .map(function (ccConfigLte) { return new caFallback_1.CcConfigLte(ccConfigLte); });
    var ccConfigNrArr = caConfigNr.split('-')
        .map(function (ccConfigNr) { return new caFallback_2.CcConfigNr(ccConfigNr); });
    var fallbackCombosLte = caCommon_1.getFallback(ccConfigLteArr, caFallback_1.CcConfigLte);
    removeNullInCombos(fallbackCombosLte);
    var fallbackCombosNr = caCommon_1.getFallback(ccConfigNrArr, caFallback_2.CcConfigNr);
    removeNullInCombos(fallbackCombosNr);
    var fallbackCombosDc = combinatorics.cartesianProduct(fallbackCombosLte, fallbackCombosNr).toArray();
    process.stdout.write('Cartesian product\n');
    fallbackCombosDc.forEach(function (comboDc) {
        var comboLte = comboDc[0], comboNr = comboDc[1];
        process.stdout.write("DC_" + comboLte.join('-') + "_" + comboNr.join('-') + "\n");
    });
}