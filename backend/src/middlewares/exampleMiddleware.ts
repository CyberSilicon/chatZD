// Exemple de middleware pour la validation ou l'authentification.
export const exampleMiddleware = (req: any, res: any, next: any) => {
    console.log('Middleware triggered');
    next();
};
