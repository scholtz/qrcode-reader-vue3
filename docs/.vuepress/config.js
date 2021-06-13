module.exports = {
  title: 'Vue Qrcode Reader',
  description: 'A set of Vue.js components for detecting and decoding QR codes.',

  base: '/qrcode-reader-vue3/',

  extraWatchFiles: [
    '../src/'
  ],

  themeConfig: {
    repo: 'gruhn/qrcode-reader-vue3',

    sidebar: {
      '/demos/': [
        'Simple',
        'DecodeAll',
        'CustomTracking',
        'LoadingIndicator',
        'ScanSameQrcodeMoreThanOnce',
        'Validate',
        'SwitchCamera',
        'Fullscreen',
        'Torch',
        'DragDrop',
        'Upload'
      ],

      '/api/': [
        'QrcodeStream',
        'QrcodeDropZone',
        'QrcodeCapture'
      ],
    },

    nav: [
      { text: 'Live Demos', link: '/demos/CustomTracking' },
      { text: 'API Reference', link: '/api/QrcodeStream' }
    ]
  }
}
