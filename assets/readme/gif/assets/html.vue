<template>
  <div id="content">
    <div v-if="currentView === NAVBAR_MENU_BUTTONS.HOMEPAGE">
      <homepage/>
    </div>
    <div v-if="currentView != NAVBAR_MENU_BUTTONS.COMPONENTS">
      <components :componentMarkup="componentMarkup"/>
    </div>
    <div :class="[!isActive ? activeClass : '', errorClass]">
      <workshop/>
    </div>
  </div>
</template>


















