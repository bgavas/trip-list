

/**
 * @swagger
 * definition:
 * 
 *   error:
 *     properties:
 *       code:
 *         type: integer
 *       message:
 *         type: string
 * 
 *   errorResponse:
 *     properties:
 *       status:
 *         type: string
 *       error:
 *         type: object
 *         $ref: '#/definitions/error'
 * 
 */