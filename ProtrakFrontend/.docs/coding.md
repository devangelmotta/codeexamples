## Consejos para escribir código

1. Usar flex para construir [layouts](https://tailwindcss.com/docs/responsive-design)

1. Los nombres de las clases de CSS deben ser escritas en minúsculas y separadas por `-`. Ejemplo: `.container-page`

1. Procurar usar los `media-queries` definidos por nosotros y que están al final de este archivo. Poner el nombre o descripción del `media-query` al momento de usarlo. Ejemplo:

   ```
   /* Tablet */
   @media only screen and (min-width: 480px) and (max-width: 991px) {
     ...
   }

   /* No mobile */
   @media only screen and (min-width: 480px) {
     ...
   }
   ```

1. Definir los estilos para mobile al inicio y después los estilos para otras resoluciones en caso de ser necesario. Ejemplo:

   ```
   .my-title{
     font-size: 20px; // This is for mobile!!
   }

   /* Tablet */
   @media only screen and (min-width: 480px) and (max-width: 991px) {
     .my-title{
       font-size: 30px;
     }
   }

   /* Desktop */
   @media only screen and (min-width: 992px) {
     .my-title{
       font-size: 40px;
     }
   }
   ```

1. Cada sentencia de CSS debe tener un `;` al final

1. Los nombres de los recursos estáticos como imágenes o fuentes deben ser escritos en minúsculas y separados por `-`. Ejemplos: `facebook-icon.svg` | `main-logo.svg`

1. Usar archivos `.svg` para los iconos

1. Identar el código CSS y entre cada grupo de reglas poner un salto de línea. Ejemplo:

   ```
   // Antes
   <style jsx>{`
   .recorded-self {
           height: 100%;
       color: #102548
     }
     .rectangle {
         height: 1px
     width: 100%;
       }
   `}</style>

   // Despues
   <style jsx>{`
     .recorded-self {
       color: #102548;
       height: 100%;
     }

     .rectangle {
       height: 1px;
       width: 100%;
     }
   `}</style>
   ```

1. Poner al inicio del atributo `className` las clases propias del elemento y después las clases de `Tailwind`. Ejemplo: `<div className="my-container row card p-4">...</div>`

1. Usar [BEM](http://getbem.com) para la nomenclatura de los elementos.

   - Ejemplo:

     ```
     const Ratings = () => (
       <div className="root container py-4 px-3">
         <hr align="left" className="career-hr my-4" />
         <h2 className="root__title mb-3">Hear from our members</h2>
         <div className="row p-2">
           <div className="rating col-12 col-md-6 col-lg-4 py-3">
             <ReactStars edit={false} count={5} size={25} value={5} />
             <p className="mt-2 mb-3">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies libero
               et metus condimentum suscipit non eget felis. Nullam vestibulum erat ligula,
               luctus maximus mi scelerisque at. Nulla interdum dictum velit eu consequat.
             </p>
             <div className="rating__user d-flex py-2">
               <img
                 src="https://i.pravatar.cc/68"
                 className="rating__user-img"
                 alt="Profile"
               />
               <div className="pl-3">
                 <p className="rating__user-name">Owen Webster</p>
                 <p className="rating__user-job">UI Designer</p>
               </div>
             </div>
             <hr className="d-none d-lg-block" />
           </div>
           <div className="rating col-12 col-md-6 col-lg-4 py-3">
             <ReactStars edit={false} count={5} size={25} value={5} />
             <p className="mt-2 mb-3">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultricies libero
               et metus condimentum suscipit non eget felis. Nullam vestibulum erat ligula,
               luctus maximus mi scelerisque at. Nulla interdum dictum velit eu consequat.
             </p>
             <div className="rating__user d-flex py-2">
               <img
                 src="https://i.pravatar.cc/68"
                 className="rating__user-img"
                 alt="Profile"
               />
               <div className="pl-3">
                 <p className="rating__user-name">Owen Webster</p>
                 <p className="rating__user-job">UI Designer</p>
               </div>
             </div>
             <hr className="d-none d-lg-block" />
           </div>
         </div>

         <style jsx>{`
           .root {
             background-color: #fafafa;
           }

           .root__title {
             font-size: 48px;
             font-weight: bold;
           }

           .rating {
             background-color: gray;
           }

           .rating:hover {
             background-color: white;
             border-radius: 10px;
             box-shadow: 0 19px 30px 0 rgba(0, 0, 0, 0.07);
           }

           .rating__user {
             border: 1px solid red;
           }

           .rating__user-img {
             border-radius: 100%;
             width: 50px;
           }

           .rating__user-name {
             font-size: 18px;
             font-weight: bold;
             line-height: 24px;
           }

           .rating__user-job {
             font-size: 14px;
           }
         `}</style>
       </div>
     );
     ```

   - En algunos casos no será necesario usar [BEM](http://getbem.com), especialmente cuando los componentes son muy simples. Ejemplo:

     ```
     const LeftSide = () => (
       <div className="col-12 col-md-5 col-lg-6 text-center text-md-left p-4 my-2">
         <h1>Sign Up, it&apos;s Free</h1>
         <h2 className="my-2">At Career Circle Our Focus Is You</h2>
         <p>
           Join CareerCircle to start growing your Circle, learn about training opportunities,
           industry insights and connecting with the CareerCircle community.
         </p>

         <style jsx>{`
           h1 {
             font-size: 36px;
             font-weight: bold;
           }

           h2 {
             font-size: 21px;
           }

           p {
             font-size: 14px;
           }

           /* Desktop */
           @media only screen and (min-width: 991px) {
             h1 {
               font-size: 48px;
             }

             h2 {
               font-size: 22px;
             }

             p {
               font-size: 18px;
             }
           }
         `}</style>
       </div>
     );
     ```

1. Procurar definir los estilos en el orden en que los elementos `HTML` son definidos. Ejemplo:

   ```
   // HTML
   <div>
     <h1>Title</h1>
     <p>Text</p>
     <span>text</span>
   </div>

   // CSS
   div{
     ...
   }

   h1{
     ...
   }

   p{
     ...
   }

   span{
     ...
   }
   ```

1. Los nombres de los archivos creados en `src/components` deben ser escritos en `Upper Camel Case`. Ejemplos: `MyComponent.jsx` | `CustomHeader.jsx`

1. Poner en la carpeta `src/components/shared` los componentes mas básicos y que se puedan usar en muchas páginas. En la carpeta `src/components/pages/...` deben ir los componentes que se usen en varias páginas que pertenezcan a un mismo grupo, por ejemplo al grupo de páginas de login, reset password, dashboard, etc

1. El atributo `alt` de los elementos `img` debe ser escrito sin usar `-`. Ejemplos: `<img alt="Profile" />` | `<img alt="Upload icon" />`

1. La estructura de los archivos `.jsx` debe ser la siguiente:

   ```
   // dependencias (borrar este comentario)
   import { useState } from 'react';
   import PropTypes from 'prop-types';

   // archivos propios (borrar este comentario)
   import { Button, GenericBanner } from '~/app/components/shared';
   import Page from '~/app/components/layout/Page';

   // componente principal
   const MyComponent = ({ prop1, prop2 }) => {
     // estados
     const [myState, setMyState] = useState();

     // componentDidMount
     componentDidMount(() => {

     })

     // effects
     useEffect(() => {

     }, [dep1, dep2]);

     // handlers
     const handleButtonClick = () => {};
     const onInputChange = () => {};

     // util functions
     const myUtilFunction = () => {};

     return (
       <div className="root">
         <Component1 />
         <Component2 />

         <style jsx>{`
           ...
         `}</style>
       </div>
     );
   };

   MyComponent.propTypes = {
     ...
   };

   MyComponent.defaultProps = {
     ...
   };

   MyComponent.getInitialProps = () => {
     ...
   };

   // --- Components ---

   const Component1 = ({ prop1, prop2 }) => {
     return (
       <div className="root">
         ...

         <style jsx>{`
           ...
         `}</style>
       </div>
     );
   };

   Component1.propTypes = {
     ...
   };

   Component1.defaultProps = {
     ...
   };

   const Component2 = ({ prop1, prop2 }) => {
     return (
       <div className="root">
         ...

         <style jsx>{`
           ...
         `}</style>
       </div>
     );
   };

   Component2.propTypes = {
     ...
   };

   Component2.defaultProps = {
     ...
   };

   export default MyComponent;
   ```

1. Por facilidad para hacer debug, evitar usar la siguiente sintaxis para escribir componentes

   ```
   // antes
   const MyComponent = () => (
     <div>...</div>
   )

   // despues
   const MyComponent = () => {
     return (
       <div>...</div>
     );
   }
   ```

1. Usar la libreria `classnames` para definir clases dinamicas o opcionales. Ejemplo:

   ```
   import classnames from 'classnames';

   <div
     className={classnames(
       'navbar-right order-1 order-lg-last',
       isLoggedIn ? 'navbar-right-loggedin' : 'navbar-right-loggedout',
     )}
   >

   <button
     type="button"
     className={classnames('btn-social', `btn-social--${type}`, className)}
     onClick={onClick}
   >

   <img
     src={`/static/images/shared/ellipse-${isResumeSteps ? 'green' : 'blue'}.svg`}
     className={classnames(
       'header__bg-img-top',
       !isResumeSteps && 'header__bg-img-top--rotate',
     )}
     alt="Background ellipse"
   />
   ```

1. Evitar usar `:global` para definir los estilos de un elemento, en caso de ser necesario, hacerlo de esta manera

   ```
   // Evitar
   :global(a) {
     ...
   }

   :global(.container) {
     ...
   }

   // -------

   // Mejor
   <div className="root">
     <Button className="button" />
     <span className="salary__footer__price" />
     <h5>Title</h5>
     <style>...</style>
   </div>

   .root :global(.my-button) {
     ...
   }

   :global(.salary__footer__price) {
     ...
   }

   .root :global(h5) {
     ...
   }
   ```

- Definir las rutas de las paginas en el archivo `src/utils/constants.js`. Ejemplo: `src/components/Layout/Footer.jsx`

## Media queries

1. Los siguientes `media-queries` están definidos para el proyecto, procurar usar primero estos en vez de los de `Tailwind`. Si estos `media-queries` no cumplen con la necesidad requerida, usar entonces los de Tailwind

   ```
   /* Tablet */
   @media only screen and (min-width: 640px) and (max-width: 1023px) {}

   /* Desktop */
   @media only screen and (min-width: 1024px) {}

   /* No mobile */
   @media only screen and (min-width: 640px) {}

   /* No desktop */
   @media only screen and (max-width: 1023px) {}
   ```

1. `media-queries` de `Tailwind`

   ```
   /* Small devices [sm] */
   @media (min-width: 640px) {}

   /* Medium devices [md] */
   @media (min-width: 768px) {}

   /* Large [lg] */
   @media (min-width: 1024px) {}

   /* Extra Large [xl] */
   @media (min-width: 1280px) {}
   ```
