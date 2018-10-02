"use strict";
var common = require("../common");
var consts_1 = require("../consts");
var botbuilder_1 = require("botbuilder");
function register(library) {
    library.dialog('confirm-dialog', createDialog());
}
exports.register = register;
function createDialog() {
    return [
        function (session, args, next) {
            const choices = ['Sí', 'No']
            const card = new botbuilder_1.ThumbnailCard(session)
            .text('¿Esta es la dirección indicada?')
            .title('Confirmar')
            .buttons(choices.map(choice => new botbuilder_1.CardAction.imBack(session, choice, choice)));
            const message = new botbuilder_1.Message(session)
            .addAttachment(card);
            botbuilder_1.Prompts.choice(session, message, choices);
            next();
        },
        function (session, results, next) {
            if (results.response && results.response.entity) {
                var response = results.response.entity;
                var result = { response: { confirmed: response === "Sí" } };
                session.endDialogWithResult(result);
                return;
            }
            session.send(consts_1.Strings.InvalidYesNo).sendBatch();
        } 
    ];
}
