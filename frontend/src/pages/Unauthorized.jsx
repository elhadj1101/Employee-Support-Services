import React from 'react'

export default function Unauthorized() {
  return (
    <section class="bg-white flx items-center justify-center h-full w-screen mt-10 ">
    <div class="py-8 px-4  lg:py-16 lg:px-6 h-fit">
        <div class="text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-[20em] text-light-blue mr-6 ">404</h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">Quelque chose manque.</p>
            <p class="mb-4 text-lg font-light text-gray-500 ">Désolé, nous ne trouvons pas cette page.</p>
            <a href="/" class="inline-flex text-white bg-light-blue hover:bg-primary-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center d my-4">Retour à la page d'accueil</a>
        </div>   
    </div>
</section>
  )
}
