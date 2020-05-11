## Pasos y permisos requeridos para usar SES en Auth0

Documentacion relacionada: [Link](https://auth0.com/docs/email/providers#configure-amazon-ses)

1. Para verificar dominio se debe crear en la subseccion domains de SES un dominio para protrak.co y en el proveedor del dominio registrar el record txt que se genera.

2. SES ya está registrado como producción pero si se requiere, se debe mandar la solicitud con las preguntas y limites que pide y sugiere el formulario se AWS.

3. Pedir las llaves de acceso (Access key y secret key) del usuario que va registrar AWS como proveedor para ponerlas una vez se hayan hecho todos los pasos en la página de custom email provider de Auth0. Aquí se requiere permiso para crear llaves de acceso pero solo se puede pedir el csv de éstas dos llaves para el usuario.

4. Agregar la polizar para enviar emails. Para este paso se requiere permiso para agregar polizas en la sección de seguridad de AWS. La poliza a agregar es esta:
   ```
    {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Action": [
                  "ses:SendRawEmail",
                  "ses:SendEmail"
              ],
              "Resource": "*"
          }
      ]
    }
   ```

5. Una vez se hayan hecho todos los pasos previos, agregar las llaves de acceso y secretas en la pagina de custom email provider. https://manage.auth0.com/dashboard/us/[YOUR_PROJECT_NAME]/templates/provider
