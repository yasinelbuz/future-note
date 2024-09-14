export const getContrastColor = (bgColor: string | undefined) => {
  // Eğer bgColor tanımsız veya geçersizse, varsayılan olarak beyaz kullan
  if (!bgColor || !/^#[0-9A-Fa-f]{6}$/.test(bgColor)) {
    bgColor = "#FFFFFF";
  }
  // Renk kodunu RGB bileşenlerine ayır
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);

  // Parlaklığı hesapla
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Parlaklığa göre siyah veya beyaz döndür
  return brightness > 128 ? "#000000" : "#FFFFFF";
};