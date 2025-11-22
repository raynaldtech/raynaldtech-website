<!-- components/privacy/DataCollection.vue -->
<template>
    <div>
      <h3>Information We Collect</h3>
      <p>We gather various types of information to provide and improve our services:</p>
      
      <table>
        <thead>
          <tr>
            <th>Data Type</th>
            <th>Collection Method</th>
            <th>Examples</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Personal Information</td>
            <td>Direct input</td>
            <td>Name, email, phone number</td>
          </tr>
          <tr>
            <td>Technical Data</td>
            <td>Automatic collection</td>
            <td>IP address, browser type, device information</td>
          </tr>
          <tr>
            <td>Usage Data</td>
            <td>Cookies & analytics</td>
            <td>Page views, service usage patterns</td>
          </tr>
          <tr>
            <td>Service Data</td>
            <td>Service provision</td>
            <td>Hardware specs, network configurations</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <style scoped>
  table {
    @apply w-full my-6;
  }
  th {
    @apply bg-neutral-100 dark:bg-neutral-700 text-left px-4 py-3;
  }
  td {
    @apply border-t border-neutral-200 dark:border-neutral-700 px-4 py-3;
  }
  </style>