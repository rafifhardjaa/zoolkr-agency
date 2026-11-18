import type { ContactContent } from '@/content/types'

export const idKontak: ContactContent = {
  head: {
    guideLabel: 'Sebutkan dalam pesan',
    guide: [
      'apa yang sedang Anda buat, dan untuk siapa',
      'tenggat atau tanggal rilis, jika sudah ditetapkan',
      'perkiraan anggaran, jika sudah ada patokannya',
    ],
    footLeft: 'Studio kreatif independen',
    footRight: 'Semarang, ID',
  },
  title: 'Kontak',
  lead: 'Ceritakan proyek Anda dan kami akan membalas segera.',
  meta: {
    label: 'Z / KONTAK',
    subtitle: '06 / HUBUNGI KAMI',
  },
  intro:
    'Kami menerima sejumlah proyek terbatas setiap kuartal. Tulis apa yang sedang Anda buat, dan tim kami membaca setiap pesan.',
  email: 'hello@zoolkr.com',
  directEmailLabel: 'Email',
  place: 'Semarang, Indonesia',
  directPlaceLabel: 'Lokasi',
  privacy:
    'Nama, email, dan pesan Anda hanya kami pakai untuk membalas percakapan ini. Tidak dibagikan ke pihak lain.',
  form: {
    nameLabel: 'Nama',
    namePlaceholder: 'Nama Anda',
    emailLabel: 'Email',
    emailPlaceholder: 'nama@perusahaan.com',
    messageLabel: 'Pesan',
    messagePlaceholder: 'Ceritakan proyek Anda...',
    submitLabel: 'Kirim pesan',
    submittingLabel: 'Mengirim...',
    successTitle: 'Terima kasih.',
    successBody: 'Pesan Anda terkirim. Kami akan membalas melalui email.',
    errorTitle: 'Ada masalah.',
    errorBody: 'Pesan Anda belum terkirim. Silakan coba lagi.',
    messages: {
      nameRequired: 'Isi nama Anda.',
      nameMin: 'Nama minimal 2 karakter.',
      emailRequired: 'Isi alamat email Anda.',
      emailInvalid: 'Alamat email tidak valid.',
      messageRequired: 'Tulis pesan Anda.',
      messageMin: 'Pesan minimal 10 karakter.',
    },
  },
}
