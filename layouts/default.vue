<template>
    <div class="min-h-screen flex flex-col">
      <AppHeader />
      <main id="main-content" class="flex-1">
        <slot />
      </main>
      <AppFooter class="mt-auto"/>
    </div>
  </template>