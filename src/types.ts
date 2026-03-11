export type CustomerStatus = 'SADIK' | 'KAYIP';
export type CallStatus = 'Bekliyor' | 'Ulaşılamadı' | 'Randevu Alındı' | 'İlgilenmiyor';

export interface AIInsights {
  dinamik_fiyatlandirma: {
    onerilen_indirim_orani: string;
    kabul_ihtimali: number;
    karlilik_etkisi: string;
  };
  churn_tahmini: {
    risk_skoru: number;
    risk_seviyesi: 'Düşük' | 'Orta' | 'Yüksek';
    uyari_mesaji: string;
    onerilen_aksiyon: string;
  };
}

export interface VehicleRecord {
  id: string;
  is_emri_bilgileri: {
    yil: number;
    is_emri_no: number;
    tarih: string;
    bayi_is_emri_kodu: string;
    bayi_is_emri_pno: string;
  };
  bayi_bilgileri: {
    kodu: number;
    adi: string;
  };
  musteri_bilgileri: {
    durum: string;
    kapanis_tarihi: string;
    vkn_tckn: string;
    adi_unvani: string;
  };
  arac_bilgileri: {
    sasi_no: string;
    trafige_cikis_tarihi: string;
    km: number;
  };
  urun_ve_stok_bilgileri: {
    stok_kodu: string;
    aciklama: string;
    miktar: number;
  };
  finans_ve_fiyatlandirma: {
    tahsil_tipi: string;
    birim_bayi_alis_fiyati: string;
    toplam_bayi_alis_fiyati: string;
    toplam_tavsiye_edilen_satis_fiyati: string;
  };
  kampanya_ve_indirim_bilgileri: {
    kampanya_donemi: string;
    bayi_alim_indirim_orani: string;
    kampanya_indirim_orani: string;
    rt_kampanya_katki_orani_1: string;
    rt_kampanya_katki_orani_2: string;
    kampanya_katki_tutari: string;
  };
  sistem_ve_uygunluk_kontrolleri: {
    sasi_uygunluk: string;
    fiks_paket_uygunluk: string;
    kayip_sadik_durumu: CustomerStatus;
    kriter_kontrol: string;
    genel_kontrol: number;
  };
  call_status: CallStatus;
  bakim_nedeni: string;
  ai_insights?: AIInsights;
}
