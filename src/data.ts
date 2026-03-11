import { VehicleRecord } from './types';

export const initialData: VehicleRecord[] = [
  {
    id: "1",
    is_emri_bilgileri: {
      yil: 2026,
      is_emri_no: 88229001,
      tarih: "03/15/2026",
      bayi_is_emri_kodu: "3400188229001",
      bayi_is_emri_pno: "34001882290019988776655"
    },
    bayi_bilgileri: {
      kodu: 34001,
      adi: "İSTANBUL MOTORLU ARAÇLAR"
    },
    musteri_bilgileri: {
      durum: "A",
      kapanis_tarihi: "03/15/2026",
      vkn_tckn: "99887766554",
      adi_unvani: "MEHMET YILMAZ LOJİSTİK"
    },
    arac_bilgileri: {
      sasi_no: "WMA00000000123456",
      trafige_cikis_tarihi: "09/10/2016",
      km: 985000
    },
    urun_ve_stok_bilgileri: {
      stok_kodu: "9988776655",
      aciklama: "TURBOŞARJ KOMPLE",
      miktar: 1
    },
    finans_ve_fiyatlandirma: {
      tahsil_tipi: "Müşteri",
      birim_bayi_alis_fiyati: "1,200.00 €",
      toplam_bayi_alis_fiyati: "1,200.00 €",
      toplam_tavsiye_edilen_satis_fiyati: "1,600.00 €"
    },
    kampanya_ve_indirim_bilgileri: {
      kampanya_donemi: "Mart",
      bayi_alim_indirim_orani: "15%",
      kampanya_indirim_orani: "20%",
      rt_kampanya_katki_orani_1: "5%",
      rt_kampanya_katki_orani_2: "2%",
      kampanya_katki_tutari: "80.00 €"
    },
    sistem_ve_uygunluk_kontrolleri: {
      sasi_uygunluk: "Uygun",
      fiks_paket_uygunluk: "var",
      kayip_sadik_durumu: "SADIK",
      kriter_kontrol: "Uygun",
      genel_kontrol: 1
    },
    call_status: 'Bekliyor',
    bakim_nedeni: 'Tahmini 1M KM Ağır Bakımı (Turbo)',
    ai_insights: {
      dinamik_fiyatlandirma: {
        onerilen_indirim_orani: "%28",
        kabul_ihtimali: 89,
        karlilik_etkisi: "Optimum (Müşteri Tutundurma Odaklı)"
      },
      churn_tahmini: {
        risk_skoru: 82,
        risk_seviyesi: "Yüksek",
        uyari_mesaji: "Mehmet Yılmaz Lojistik'in son 2 periyodik bakımı gecikti. Sanayiye yönelme riski yüksek.",
        onerilen_aksiyon: "Hemen %28 Turboşarj indirimi ve ücretsiz check-up teklif et."
      }
    }
  },
  {
    id: "2",
    is_emri_bilgileri: {
      yil: 2026,
      is_emri_no: 88229002,
      tarih: "02/20/2026",
      bayi_is_emri_kodu: "0600288229002",
      bayi_is_emri_pno: "06002882290021122334455"
    },
    bayi_bilgileri: {
      kodu: 6002,
      adi: "ANKARA AĞIR VASITA"
    },
    musteri_bilgileri: {
      durum: "K",
      kapanis_tarihi: "02/20/2026",
      vkn_tckn: "11223344556",
      adi_unvani: "BAŞKENT NAKLİYAT LTD. ŞTİ."
    },
    arac_bilgileri: {
      sasi_no: "WMA00000000789012",
      trafige_cikis_tarihi: "04/05/2019",
      km: 650000
    },
    urun_ve_stok_bilgileri: {
      stok_kodu: "1122334455",
      aciklama: "FREN DİSKİ VE BALATA SETİ",
      miktar: 2
    },
    finans_ve_fiyatlandirma: {
      tahsil_tipi: "Müşteri",
      birim_bayi_alis_fiyati: "250.00 €",
      toplam_bayi_alis_fiyati: "500.00 €",
      toplam_tavsiye_edilen_satis_fiyati: "750.00 €"
    },
    kampanya_ve_indirim_bilgileri: {
      kampanya_donemi: "Şubat",
      bayi_alim_indirim_orani: "20%",
      kampanya_indirim_orani: "25%",
      rt_kampanya_katki_orani_1: "10%",
      rt_kampanya_katki_orani_2: "0%",
      kampanya_katki_tutari: "75.00 €"
    },
    sistem_ve_uygunluk_kontrolleri: {
      sasi_uygunluk: "Uygun",
      fiks_paket_uygunluk: "var",
      kayip_sadik_durumu: "KAYIP",
      kriter_kontrol: "Uygun",
      genel_kontrol: 0
    },
    call_status: 'Bekliyor',
    bakim_nedeni: 'Fren Sistemi Değişim Periyodu',
    ai_insights: {
      dinamik_fiyatlandirma: {
        onerilen_indirim_orani: "%35",
        kabul_ihtimali: 72,
        karlilik_etkisi: "Geri Kazanım Odaklı (Düşük Marj)"
      },
      churn_tahmini: {
        risk_skoru: 94,
        risk_seviyesi: "Yüksek",
        uyari_mesaji: "Müşteri 18 aydır yetkili servise uğramadı. Tamamen kaybedilmiş olabilir.",
        onerilen_aksiyon: "Agresif geri kazanım paketi (%35 indirim) ile doğrudan filo yöneticisini ara."
      }
    }
  },
  {
    id: "3",
    is_emri_bilgileri: {
      yil: 2026,
      is_emri_no: 88229003,
      tarih: "04/01/2026",
      bayi_is_emri_kodu: "3500388229003",
      bayi_is_emri_pno: "35003882290035544332211"
    },
    bayi_bilgileri: {
      kodu: 35003,
      adi: "EGE KAMYON SERVİSİ"
    },
    musteri_bilgileri: {
      durum: "A",
      kapanis_tarihi: "04/01/2026",
      vkn_tckn: "55443322110",
      adi_unvani: "KORDON ULUSLARARASI TAŞIMACILIK"
    },
    arac_bilgileri: {
      sasi_no: "WMA00000000345678",
      trafige_cikis_tarihi: "11/12/2022",
      km: 280000
    },
    urun_ve_stok_bilgileri: {
      stok_kodu: "5544332211",
      aciklama: "PERİYODİK BAKIM FİLTRE SETİ",
      miktar: 1
    },
    finans_ve_fiyatlandirma: {
      tahsil_tipi: "Müşteri",
      birim_bayi_alis_fiyati: "150.00 €",
      toplam_bayi_alis_fiyati: "150.00 €",
      toplam_tavsiye_edilen_satis_fiyati: "220.00 €"
    },
    kampanya_ve_indirim_bilgileri: {
      kampanya_donemi: "Nisan",
      bayi_alim_indirim_orani: "10%",
      kampanya_indirim_orani: "15%",
      rt_kampanya_katki_orani_1: "5%",
      rt_kampanya_katki_orani_2: "0%",
      kampanya_katki_tutari: "11.00 €"
    },
    sistem_ve_uygunluk_kontrolleri: {
      sasi_uygunluk: "Uygun",
      fiks_paket_uygunluk: "var",
      kayip_sadik_durumu: "SADIK",
      kriter_kontrol: "Uygun",
      genel_kontrol: 1
    },
    call_status: 'Bekliyor',
    bakim_nedeni: '300.000 KM Periyodik Bakımı',
    ai_insights: {
      dinamik_fiyatlandirma: {
        onerilen_indirim_orani: "%12",
        kabul_ihtimali: 95,
        karlilik_etkisi: "Yüksek Kârlılık (Sadık Müşteri)"
      },
      churn_tahmini: {
        risk_skoru: 12,
        risk_seviyesi: "Düşük",
        uyari_mesaji: "Müşteri tüm bakımlarını zamanında ve yetkili serviste yaptırıyor.",
        onerilen_aksiyon: "Standart bakım hatırlatması yap ve randevu oluştur."
      }
    }
  },
  {
    id: "4",
    is_emri_bilgileri: {
      yil: 2026,
      is_emri_no: 88229004,
      tarih: "01/10/2026",
      bayi_is_emri_kodu: "0700488229004",
      bayi_is_emri_pno: "07004882290046677889900"
    },
    bayi_bilgileri: {
      kodu: 7004,
      adi: "AKDENİZ OTO"
    },
    musteri_bilgileri: {
      durum: "K",
      kapanis_tarihi: "01/10/2026",
      vkn_tckn: "66778899001",
      adi_unvani: "TOROSLAR HAFRİYAT"
    },
    arac_bilgileri: {
      sasi_no: "WMA00000000901234",
      trafige_cikis_tarihi: "07/25/2015",
      km: 1450000
    },
    urun_ve_stok_bilgileri: {
      stok_kodu: "6677889900",
      aciklama: "ŞANZIMAN REVİZYON KİTİ",
      miktar: 1
    },
    finans_ve_fiyatlandirma: {
      tahsil_tipi: "Müşteri",
      birim_bayi_alis_fiyati: "2,100.00 €",
      toplam_bayi_alis_fiyati: "2,100.00 €",
      toplam_tavsiye_edilen_satis_fiyati: "2,800.00 €"
    },
    kampanya_ve_indirim_bilgileri: {
      kampanya_donemi: "Ocak",
      bayi_alim_indirim_orani: "25%",
      kampanya_indirim_orani: "30%",
      rt_kampanya_katki_orani_1: "15%",
      rt_kampanya_katki_orani_2: "5%",
      kampanya_katki_tutari: "420.00 €"
    },
    sistem_ve_uygunluk_kontrolleri: {
      sasi_uygunluk: "Uygun",
      fiks_paket_uygunluk: "yok",
      kayip_sadik_durumu: "KAYIP",
      kriter_kontrol: "Uygun",
      genel_kontrol: 0
    },
    call_status: 'Bekliyor',
    bakim_nedeni: 'Ağır Şanzıman Bakımı (1.5M KM)',
    ai_insights: {
      dinamik_fiyatlandirma: {
        onerilen_indirim_orani: "%32",
        kabul_ihtimali: 68,
        karlilik_etkisi: "Dengeli (Yüksek Ciro)"
      },
      churn_tahmini: {
        risk_skoru: 65,
        risk_seviyesi: "Orta",
        uyari_mesaji: "Araç yaşlı ve ağır bakım maliyeti yüksek. Yan sanayi parça kullanım riski var.",
        onerilen_aksiyon: "Orijinal parçanın uzun ömür avantajını vurgula, ödeme kolaylığı sağla."
      }
    }
  }
];
