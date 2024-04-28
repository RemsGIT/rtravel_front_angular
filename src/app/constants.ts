 export const apiEndpoint = "http://localhost:3333"
export const constants = {
  TOKEN_NAME: 'rtravel_tk',
  messages: {
    trip: {
      SUCCESS_CREATE: "Votre nouveau voyage a été ajouté",
      SUCCESS_UPDATE: "Voyage modifié"
    },
    activity: {
      SUCCESS_CREATE: "L'activité a bien été ajoutée",
      SUCCESS_UPDATE: "L'activité a bien été modifiée",
    },
    participant: {
      SUCCESS_CREATE: "Un participant a été ajouté",
      SUCCESS_DELETE: "Le participant a bien été supprimé",
    },
    ERROR_CREATE: "Erreur lors de la création, réessayez plus tard",
    ERROR_UPDATE: "Erreur lors de la modification, réessayez plus tard",
    ERROR_DELETE: "Erreur lors de la suppression, réessayez plus tard",
    ERROR_GENERIC: "Une erreur est survenue, réessayez plus tard",
    ERROR_NEED_WRITE: "Tu n'as pas le droit de modifier ce voyage"

  },
  defaults: {
    image_colosseum: 'https://a.cdn-hotels.com/gdcs/production40/d811/5e89ad90-8f10-11e8-b6b0-0242ac110007.jpg?impolicy=fcrop&w=1600&h=1066&q=medium'
  }
}
