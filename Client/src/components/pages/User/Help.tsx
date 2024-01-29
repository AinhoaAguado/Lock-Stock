import React, { useState } from "react";
import Navbar from "../../templates/Navbar";
import HeaderMenu from "../../templates/HeaderMenu";

const Help = (): React.JSX.Element => {

  const helpQuestions = [
    {
      "question": "Como funciona el generador de contraseñas",
      "response": "El generador de contraseñas utiliza un algoritmo seguro para crear combinaciones aleatorias de caracteres, números y símbolos, proporcionando contraseñas robustas y difíciles de descifrar."
    },
    {
      "question": "¿Puedo personalizar la longitud y complejidad de las contraseñas generadas?",
      "response": "Sí, puedes ajustar la longitud y complejidad de las contraseñas según tus preferencias de seguridad."
    },
    {
      "question": "¿Es seguro almacenar mis contraseñas en la plataforma?",
      "response": "Sí, todas las contraseñas se almacenan de forma segura utilizando técnicas de cifrado avanzadas. Además, recomendamos encarecidamente establecer una contraseña maestra fuerte para garantizar la máxima seguridad."
    },
    {
      "question": "¿Cómo puedo recuperar una contraseña olvidada?",
      "response": "Ofrecemos opciones de recuperación de contraseña, que generalmente incluyen el uso de una dirección de correo electrónico segura o preguntas de seguridad. Asegúrate de tener acceso a la información de recuperación."
    },
    {
      "question": "¿Puedo acceder a mis contraseñas desde diferentes dispositivos?",
      "response": "Sí, puedes acceder a tus contraseñas desde cualquier dispositivo con acceso a Internet, siempre y cuando ingreses con tu cuenta y contraseña maestra."
    },
    {
      "question": "¿Cómo puedo garantizar la privacidad de mis contraseñas?",
      "response": "La privacidad y seguridad son nuestras principales prioridades. Utilizamos protocolos de seguridad estándar y cifrado para proteger tus datos. Además, recomendamos no compartir tu contraseña maestra y habilitar la autenticación de dos factores."
    },
    {
      "question": "¿Qué debo hacer si creo que mi cuenta ha sido comprometida?",
      "response": "Si sospechas que tu cuenta está en riesgo, cambia tu contraseña maestra inmediatamente y revisa las actividades recientes en tu cuenta. Si es necesario, ponte en contacto con nuestro equipo de soporte."
    },
    {
      "question": "¿Cómo puedo importar/exportar contraseñas a/desde otros gestores de contraseñas?",
      "response": "Proporcionamos opciones para importar y exportar contraseñas en formatos compatibles, lo que facilita la migración desde o hacia otros gestores de contraseñas."
    },
    {
      "question": "¿Es posible usar el generador de contraseñas sin almacenarlas en la plataforma?",
      "response": "Sí, puedes generar contraseñas sin necesidad de almacenarlas en nuestra plataforma. Solo asegúrate de copiar y guardar la contraseña generada de forma segura."
    },
    {
      "question": "¿Qué medidas de seguridad adicionales puedo tomar para proteger mis contraseñas?",
      "response": "Además de utilizar contraseñas fuertes y únicas, te recomendamos habilitar la autenticación de dos factores siempre que sea posible y mantener actualizados tus dispositivos y software."
    }
  ];
  
  
  const [find, setFind] = useState('');
  const [ question, setQuestion ] = useState(helpQuestions)

  
  const findQuestion = () => {
    const helpFilter = find.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    setQuestion(helpQuestions.filter((a) =>
      (a.question.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(helpFilter.toLowerCase())) ||
      (a.response.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(helpFilter.toLowerCase()))
    ));
  }



  return (
    <>
      <HeaderMenu />
      <section className="flex">
        <Navbar ayuda />
        <section className="w-3/4 flex flex-col items-center gap-y-20">
          <div className="w-full mt-10 flex flex-col gap-5">
            <div className="flex gap-2 justify-center items-center">
              <img src="/src/images/help-icon.svg" alt="help-icon" />
              <h1 className="text-primary text-5xl font-medium">Ayuda</h1>
            </div>
            <label htmlFor="" className="flex justify-center h-8 w-full">
              <figure className="bg-black flex justify-center items-center rounded w-32">
                <img src="/src/images/logo.svg" alt="logo" className="h-3/4" />
              </figure>
              <input
                type="text"
                className="p-3 w-1/2 border border-black rounded"
                placeholder="¿En qué podemos ayudarte?"
                onChange={(e) => setFind(e.target.value)}
              />
              <input
                type="submit"
                value="Buscar"
                className="w-32 h-full rounded bg-primary text-white font-semibold" onClick={findQuestion} 
              />
            </label>
          </div>

          <article className="w-full flex flex-col items-center gap-7 mb-10">
            <h1 className="text-center text-primary font-medium text-5xl">FAQS</h1>

            {question.map((a, b) => (
              <details className="w-1/2 text-primary" key={b}>
                <summary className="font-semibold">
                  {`${b + 1}. `}{a.question}
                </summary>
                <p>{a.response}</p>
              </details>
            ))}
          </article>
        </section>
      </section>
    </>
  );
};

export default Help;
