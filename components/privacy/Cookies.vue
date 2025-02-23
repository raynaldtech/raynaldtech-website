<!-- components/privacy/Cookies.vue -->
<template>
  <div>
    <h3>Cookie Usage Policy</h3>
    <p>We use cookies to enhance your experience:</p>
    
    <div class="my-6 overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr>
            <th>Cookie Type</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Essential</td>
            <td>Website functionality</td>
            <td>Session</td>
          </tr>
          <tr>
            <td>Performance</td>
            <td>Service optimization</td>
            <td>30 days</td>
          </tr>
          <tr>
            <td>Analytics</td>
            <td>Usage statistics</td>
            <td>1 year</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-neutral-100 dark:bg-neutral-700 p-4 rounded-lg">
      <h4 class="font-semibold mb-2">Managing Cookies</h4>
      <p class="text-sm">
        Adjust settings via our 
        <NuxtLink to="/cookie-policy" class="text-secondary hover:underline">
          Cookie Preferences
        </NuxtLink> 
        or browser controls
      </p>
    </div>
  </div>
</template>