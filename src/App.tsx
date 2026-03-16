import React, { useState, useMemo } from 'react';
import { 
  Phone, 
  Calendar, 
  PhoneOff, 
  UserX, 
  Search, 
  Filter, 
  Truck, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronRight,
  Menu,
  X,
  BrainCircuit,
  TrendingUp,
  BellRing,
  Send,
  MessageSquare,
  Tag,
  Star
} from 'lucide-react';
import { initialData } from './data';
import { VehicleRecord, CallStatus } from './types';

export default function App() {
  const [data, setData] = useState<VehicleRecord[]>(initialData);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'Tümü' | 'SADIK' | 'KAYIP'>('Tümü');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'bugun' | 'tum_araclar' | 'randevular'>('bugun');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: 'Merhaba! Ben AI Servis Asistanınız. Müşteri analizleri, randevu optimizasyonu veya iletişim önerileri için bana danışabilirsiniz.' }
  ]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessages = [...chatMessages, { role: 'user' as const, content: chatInput }];
    setChatMessages(newMessages);
    setChatInput('');
    
    setTimeout(() => {
      let aiResponse = "Anlıyorum. Bu konuda size yardımcı olmak için verileri analiz ediyorum...";
      if (chatInput.toLowerCase().includes('kimleri')) {
        aiResponse = "Bugün öncelikli olarak churn riski yüksek olan 2 müşteriyi (Mehmet Yılmaz ve Başkent Nakliyat) aramanızı öneririm. Onlar için özel indirim kampanyaları hazırladım.";
      } else if (chatInput.toLowerCase().includes('randevu')) {
        aiResponse = "Yarınki yağışlı hava nedeniyle randevularda %15 iptal riski görüyorum. İsterseniz tüm randevulu müşterilere 'Ücretsiz Vale' teklifi içeren bir SMS atabilirim.";
      } else if (chatInput.toLowerCase().includes('teklif')) {
        aiResponse = "Müşterinin geçmiş verilerine göre %15'lik bir indirim kabul ihtimalini %85'e çıkarıyor. Karlılığı korumak için motor yağı değişiminde ek kampanya sunabilirsiniz.";
      }
      
      setChatMessages([...newMessages, { role: 'ai' as const, content: aiResponse }]);
    }, 1000);
  };

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.arac_bilgileri.sasi_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.musteri_bilgileri.adi_unvani.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterStatus === 'Tümü' || item.sistem_ve_uygunluk_kontrolleri.kayip_sadik_durumu === filterStatus;
      
      return matchesSearch && matchesFilter;
    });
  }, [data, searchTerm, filterStatus]);

  const stats = useMemo(() => {
    const total = data.length;
    const called = data.filter(d => d.call_status !== 'Bekliyor').length;
    const appointments = data.filter(d => d.call_status === 'Randevu Alındı').length;
    return { total, called, appointments };
  }, [data]);

  const handleCallAction = (id: string, status: CallStatus) => {
    setData(prev => prev.map(item => item.id === id ? { ...item, call_status: status } : item));
    if (selectedVehicle && selectedVehicle.id === id) {
      setSelectedVehicle({ ...selectedVehicle, call_status: status });
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'SADIK' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-rose-100 text-rose-800 border-rose-200';
  };

  const getPriorityColor = (priority?: number) => {
    switch (priority) {
      case 1: return 'bg-blue-600 text-white border-blue-700 shadow-sm';
      case 2: return 'bg-orange-500 text-white border-orange-600 shadow-sm';
      case 3: return 'bg-orange-300 text-orange-900 border-orange-400';
      case 4: return 'bg-slate-300 text-slate-700 border-slate-400';
      default: return 'hidden';
    }
  };

  const getPriorityLabel = (priority?: number) => {
    switch (priority) {
      case 1: return 'Prio 1';
      case 2: return 'Prio 2';
      case 3: return 'Prio 3';
      case 4: return 'Prio 4';
      default: return '';
    }
  };

  const getCallStatusBadge = (status: CallStatus) => {
    switch (status) {
      case 'Bekliyor': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><Clock className="w-3 h-3 mr-1" /> Bekliyor</span>;
      case 'Randevu Alındı': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"><CheckCircle2 className="w-3 h-3 mr-1" /> Randevu Alındı</span>;
      case 'Ulaşılamadı': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800"><PhoneOff className="w-3 h-3 mr-1" /> Ulaşılamadı</span>;
      case 'İlgilenmiyor': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800"><UserX className="w-3 h-3 mr-1" /> İlgilenmiyor</span>;
    }
  };

  const handleSendPushNotification = () => {
    alert("Müşteriye özel AI destekli push bildirimi gönderildi!");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <Wrench className="w-6 h-6 text-blue-400" />
          <span className="font-bold text-lg tracking-tight">Servis Asistanı</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-10 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col
      `}>
        <div className="p-6 hidden md:flex items-center gap-3 border-b border-slate-800">
          <div className="bg-blue-500/20 p-2 rounded-lg">
            <Wrench className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="font-bold text-white tracking-tight">Servis Asistanı</h1>
            <p className="text-xs text-slate-400">Danışman Portalı</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button onClick={() => { setCurrentView('bugun'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'bugun' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}>
            <Phone className="w-5 h-5" />
            Bugün Aranacaklar
          </button>
          <button onClick={() => { setCurrentView('tum_araclar'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'tum_araclar' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}>
            <Truck className="w-5 h-5" />
            Tüm Araçlar
          </button>
          <button onClick={() => { setCurrentView('randevular'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'randevular' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}>
            <Calendar className="w-5 h-5" />
            Randevular
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-white">
              SD
            </div>
            <div>
              <p className="text-sm font-medium text-white">Servis Danışmanı</p>
              <p className="text-xs text-slate-400">Bursa Bayi</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {currentView === 'bugun' && (
          <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Topbar / Stats */}
        <header className="bg-white border-b border-slate-200 p-4 md:p-6 shrink-0">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Aksiyon Bekleyenler</h2>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 sm:p-4 flex flex-col justify-center">
                <span className="text-xs sm:text-sm font-medium text-slate-500 mb-1">Hedef</span>
                <span className="text-xl sm:text-3xl font-bold text-slate-800">{stats.total}</span>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 sm:p-4 flex flex-col justify-center">
                <span className="text-xs sm:text-sm font-medium text-blue-600 mb-1">Aranan</span>
                <span className="text-xl sm:text-3xl font-bold text-blue-700">{stats.called}</span>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 sm:p-4 flex flex-col justify-center">
                <span className="text-xs sm:text-sm font-medium text-emerald-600 mb-1">Randevu</span>
                <span className="text-xl sm:text-3xl font-bold text-emerald-700">{stats.appointments}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area (List + Detail) */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row max-w-7xl mx-auto w-full">
          
          {/* List Section */}
          <div className={`flex-1 flex flex-col border-r border-slate-200 bg-white ${selectedVehicle ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-slate-100 flex gap-2">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Şasi No veya Müşteri Ara..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
              >
                <option value="Tümü">Tümü</option>
                <option value="SADIK">Sadık</option>
                <option value="KAYIP">Kayıp</option>
              </select>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {filteredData.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedVehicle(item)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                    selectedVehicle?.id === item.id 
                      ? 'bg-blue-50 border-blue-200 shadow-sm ring-1 ring-blue-500' 
                      : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div className="font-mono text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-2 break-all">
                      {item.arac_bilgileri.sasi_no}
                      {item.ai_insights?.churn_tahmini.risk_seviyesi === 'Yüksek' && item.sistem_ve_uygunluk_kontrolleri.kayip_sadik_durumu === 'SADIK' && (
                        <span className="flex items-center justify-center w-4 h-4 rounded-full bg-rose-100 text-rose-600 shrink-0" title="Yüksek Churn Riski">
                          <AlertCircle className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="flex gap-1">
                        {item.sistem_ve_uygunluk_kontrolleri.oncelik && (
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-md border uppercase tracking-wide flex items-center gap-1 ${getPriorityColor(item.sistem_ve_uygunluk_kontrolleri.oncelik)}`}>
                            {item.sistem_ve_uygunluk_kontrolleri.oncelik === 1 && <Star className="w-3 h-3 fill-current" />}
                            {getPriorityLabel(item.sistem_ve_uygunluk_kontrolleri.oncelik)}
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md border uppercase tracking-wide ${getStatusColor(item.sistem_ve_uygunluk_kontrolleri.kayip_sadik_durumu)}`}>
                          {item.sistem_ve_uygunluk_kontrolleri.kayip_sadik_durumu}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="font-medium text-slate-900 mb-1 truncate">{item.musteri_bilgileri.adi_unvani}</div>
                  {item.sistem_ve_uygunluk_kontrolleri.lead_source && (
                    <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-100 w-fit px-2 py-0.5 rounded-full mb-2 border border-slate-200">
                      <Tag className="w-3 h-3" />
                      <span>Kaynak: {item.sistem_ve_uygunluk_kontrolleri.lead_source}</span>
                    </div>
                  )}
                  <div className="text-xs text-slate-500 mb-3 flex items-start gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{item.bakim_nedeni}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-3 border-t border-slate-100/50">
                    {getCallStatusBadge(item.call_status)}
                    <ChevronRight className={`w-4 h-4 ${selectedVehicle?.id === item.id ? 'text-blue-500' : 'text-slate-300'}`} />
                  </div>
                </button>
              ))}
              
              {filteredData.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <Filter className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                  <p>Sonuç bulunamadı.</p>
                </div>
              )}
            </div>
          </div>

          {/* Detail Section */}
          <div className={`flex-1 bg-slate-50 flex flex-col ${!selectedVehicle ? 'hidden md:flex items-center justify-center' : 'flex'}`}>
            {!selectedVehicle ? (
              <div className="text-center text-slate-400 p-8">
                <Truck className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">Detayları görmek için bir araç seçin</p>
                <p className="text-sm mt-2">Müşteri kartı, kampanya bilgileri ve arama aksiyonları burada görünür.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto w-full">
                {/* Mobile Back Button */}
                <div className="md:hidden p-4 bg-white border-b border-slate-200 sticky top-0 z-10">
                  <button 
                    onClick={() => setSelectedVehicle(null)}
                    className="flex items-center text-sm font-medium text-blue-600"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
                    Listeye Dön
                  </button>
                </div>

                <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
                  
                  {/* Header Card */}
                  <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 break-words">{selectedVehicle.musteri_bilgileri.adi_unvani}</h3>
                        <p className="text-slate-500 font-mono text-sm">{selectedVehicle.musteri_bilgileri.vkn_tckn}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 shrink-0 items-end sm:items-start">
                        {selectedVehicle.sistem_ve_uygunluk_kontrolleri.oncelik && (
                          <span className={`self-start text-xs font-bold px-3 py-1.5 rounded-lg border uppercase tracking-wide flex items-center justify-center gap-1 ${getPriorityColor(selectedVehicle.sistem_ve_uygunluk_kontrolleri.oncelik)}`}>
                            {selectedVehicle.sistem_ve_uygunluk_kontrolleri.oncelik === 1 && <Star className="w-3.5 h-3.5 fill-current" />}
                            ÖNCELİK: {getPriorityLabel(selectedVehicle.sistem_ve_uygunluk_kontrolleri.oncelik)}
                          </span>
                        )}
                        <span className={`self-start text-xs font-bold px-3 py-1.5 rounded-lg border uppercase tracking-wide ${getStatusColor(selectedVehicle.sistem_ve_uygunluk_kontrolleri.kayip_sadik_durumu)}`}>
                          {selectedVehicle.sistem_ve_uygunluk_kontrolleri.kayip_sadik_durumu} MÜŞTERİ
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-slate-100 my-4">
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500 font-medium mb-1">Şasi No</p>
                        <p className="font-mono font-medium text-slate-900 break-all">{selectedVehicle.arac_bilgileri.sasi_no}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1">Güncel KM</p>
                        <p className="font-medium text-slate-900">{selectedVehicle.arac_bilgileri.km.toLocaleString('tr-TR')} KM</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1">Trafiğe Çıkış</p>
                        <p className="font-medium text-slate-900">{selectedVehicle.arac_bilgileri.trafige_cikis_tarihi}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500 font-medium mb-1">Aksiyon Nedeni</p>
                        <p className="font-medium text-rose-600 break-words">{selectedVehicle.bakim_nedeni}</p>
                      </div>
                    </div>

                    {/* Customer Wallet Share & Potential Block */}
                    {selectedVehicle.finans_ve_fiyatlandirma.potansiyel_tutar && (
                      <div className="mb-4">
                        <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Müşteri Cüzdan Payı & Potansiyel</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-center">
                            <span className="text-[11px] font-medium text-slate-500 mb-1">POTANSİYEL HARCAMA</span>
                            <span className="text-lg font-bold text-slate-800">{selectedVehicle.finans_ve_fiyatlandirma.potansiyel_tutar}</span>
                          </div>
                          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex flex-col justify-center">
                            <span className="text-[11px] font-medium text-emerald-600 mb-1">GERÇEKLEŞEN (BİZDE)</span>
                            <span className="text-lg font-bold text-emerald-700">{selectedVehicle.finans_ve_fiyatlandirma.gerceklesen_tutar}</span>
                          </div>
                          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex flex-col justify-center">
                            <span className="text-[11px] font-medium text-rose-600 mb-1">KAÇIRILAN FIRSAT</span>
                            <span className="text-lg font-bold text-rose-700">{selectedVehicle.finans_ve_fiyatlandirma.kacirilan_firsat}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Campaign Info */}
                    <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">KAMPANYA</span>
                        <span className="text-sm font-bold text-blue-900">2026 KM Kampanyası 2.0</span>
                      </div>
                      <p className="text-sm text-blue-800 mb-3">
                        Bu araca standart <strong>{selectedVehicle.kampanya_ve_indirim_bilgileri.kampanya_indirim_orani}</strong> indirim tanımlanabilir. 
                        Kampanya katkı tutarı: <strong>{selectedVehicle.kampanya_ve_indirim_bilgileri.kampanya_katki_tutari}</strong>
                      </p>
                      
                      <div className="bg-white/60 rounded-xl p-3 text-sm">
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-600">Önerilen İşlem:</span>
                          <span className="font-medium text-slate-900">{selectedVehicle.urun_ve_stok_bilgileri.aciklama}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Tavsiye Edilen Fiyat:</span>
                          <span className="font-medium text-slate-900 line-through mr-2">{selectedVehicle.finans_ve_fiyatlandirma.toplam_tavsiye_edilen_satis_fiyati}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Insights Card */}
                  {selectedVehicle.ai_insights && (
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 border border-indigo-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <BrainCircuit className="w-24 h-24 text-indigo-900" />
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4 relative z-10">
                        <BrainCircuit className="w-5 h-5 text-indigo-600" />
                        <h4 className="text-sm font-bold text-indigo-900 uppercase tracking-wider">AI Analiz & Öneriler</h4>
                      </div>

                      <div className="space-y-4 relative z-10">
                        {/* Churn Warning */}
                        {selectedVehicle.ai_insights.churn_tahmini.risk_seviyesi === 'Yüksek' && (
                          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-rose-200 shadow-sm">
                            <div className="flex items-start gap-3">
                              <div className="bg-rose-100 p-2 rounded-full shrink-0">
                                <BellRing className="w-5 h-5 text-rose-600" />
                              </div>
                              <div>
                                <h5 className="text-sm font-bold text-rose-900 mb-1">Erken Uyarı: Yüksek Terk (Churn) Riski</h5>
                                <p className="text-sm text-rose-800 mb-2">{selectedVehicle.ai_insights.churn_tahmini.uyari_mesaji}</p>
                                <p className="text-xs font-medium text-rose-700 bg-rose-50 inline-block px-2 py-1 rounded">
                                  Öneri: {selectedVehicle.ai_insights.churn_tahmini.onerilen_aksiyon}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Potential Details Insight */}
                        {selectedVehicle.ai_insights.potansiyel_detayi && (
                          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-indigo-200 shadow-sm">
                            <h5 className="text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4" />
                              Potansiyel Detay Analizi
                            </h5>
                            <ul className="text-sm text-indigo-800 list-disc list-inside">
                              <li><span className="font-medium">İçgörü:</span> {selectedVehicle.ai_insights.potansiyel_detayi}</li>
                            </ul>
                          </div>
                        )}

                        {/* Dynamic Pricing */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-indigo-100 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="bg-indigo-100 p-2 rounded-full shrink-0">
                              <TrendingUp className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                              <h5 className="text-sm font-bold text-indigo-900 mb-1">Dinamik Fiyatlandırma</h5>
                              <p className="text-sm text-indigo-800">
                                Standart {selectedVehicle.kampanya_ve_indirim_bilgileri.kampanya_indirim_orani} yerine 
                                <strong className="text-indigo-900 mx-1">{selectedVehicle.ai_insights.dinamik_fiyatlandirma.onerilen_indirim_orani}</strong> 
                                indirim öneriliyor.
                              </p>
                              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-indigo-700 font-medium">
                                <span className="bg-indigo-50 px-2 py-1 rounded">Kabul İhtimali: %{selectedVehicle.ai_insights.dinamik_fiyatlandirma.kabul_ihtimali}</span>
                                <span className="bg-indigo-50 px-2 py-1 rounded">Etki: {selectedVehicle.ai_insights.dinamik_fiyatlandirma.karlilik_etkisi}</span>
                              </div>
                            </div>
                          </div>
                          
                          <button 
                            onClick={handleSendPushNotification}
                            className="w-full sm:w-auto shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            Teklifi Gönder
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Arama Sonucu Kaydet</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button 
                        onClick={() => handleCallAction(selectedVehicle.id, 'Randevu Alındı')}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                          selectedVehicle.call_status === 'Randevu Alındı' 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                            : 'border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 text-slate-600'
                        }`}
                      >
                        <Calendar className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium text-center">Randevu Alındı</span>
                      </button>
                      
                      <button 
                        onClick={() => handleCallAction(selectedVehicle.id, 'Ulaşılamadı')}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                          selectedVehicle.call_status === 'Ulaşılamadı' 
                            ? 'border-amber-500 bg-amber-50 text-amber-700' 
                            : 'border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 text-slate-600'
                        }`}
                      >
                        <PhoneOff className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium text-center">Ulaşılamadı</span>
                      </button>
                      
                      <button 
                        onClick={() => handleCallAction(selectedVehicle.id, 'İlgilenmiyor')}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                          selectedVehicle.call_status === 'İlgilenmiyor' 
                            ? 'border-rose-500 bg-rose-50 text-rose-700' 
                            : 'border-slate-100 hover:border-rose-200 hover:bg-rose-50/50 text-slate-600'
                        }`}
                      >
                        <UserX className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium text-center">İlgilenmiyor</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
        </div>
        )}

        {currentView === 'tum_araclar' && (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Tüm Araçlar ve Müşteriler</h2>
              </div>
              
              {/* AI Search Bar */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-1 mb-6 shadow-md">
                <div className="bg-white rounded-xl p-2 flex flex-col sm:flex-row items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-lg hidden sm:block">
                    <BrainCircuit className="w-5 h-5 text-indigo-600" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Yapay zekaya sorun (Örn: Son 1 yılda servise gelmeyen ticari araçları listele)" 
                    className="flex-1 border-none focus:ring-0 text-sm py-2 w-full outline-none"
                  />
                  <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Analiz Et
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Müşteri</th>
                        <th className="px-6 py-4 font-semibold">Şasi No</th>
                        <th className="px-6 py-4 font-semibold">Segment</th>
                        <th className="px-6 py-4 font-semibold">Durum</th>
                        <th className="px-6 py-4 font-semibold">AI Churn Riski</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{item.musteri_bilgileri.adi_unvani}</td>
                          <td className="px-6 py-4 font-mono text-slate-500">{item.arac_bilgileri.sasi_no}</td>
                          <td className="px-6 py-4">{item.musteri_bilgileri.segment}</td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-md border uppercase tracking-wide ${getStatusColor(item.sistem_ve_uygunluk_kontrolleri.kayip_sadik_durumu)}`}>
                              {item.sistem_ve_uygunluk_kontrolleri.kayip_sadik_durumu}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {item.ai_insights?.churn_tahmini.risk_seviyesi === 'Yüksek' ? (
                              <span className="inline-flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-1 rounded text-xs font-medium border border-rose-100">
                                <TrendingUp className="w-3 h-3" /> Yüksek
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-medium border border-emerald-100">
                                Düşük
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'randevular' && (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Yaklaşan Randevular</h2>
              </div>

              {/* AI Weather/Traffic Insight */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-start gap-4 shadow-sm">
                <div className="bg-amber-100 p-3 rounded-xl shrink-0">
                  <BrainCircuit className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-amber-900 font-bold mb-1">AI Operasyonel Öngörü</h4>
                  <p className="text-amber-800 text-sm mb-3">
                    Yarın bölgenizde yoğun yağış bekleniyor. Geçmiş verilere göre bu durum randevu iptallerini %24 artırmaktadır. 
                    Yarınki randevulara otomatik "Hava Durumu Hatırlatması ve Ücretsiz Vale Hizmeti" teklifi göndermek ister misiniz?
                  </p>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    Otomatik Kampanyayı Başlat
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.filter(d => d.call_status === 'Randevu Alındı').length > 0 ? data.filter(d => d.call_status === 'Randevu Alındı').map(item => (
                  <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="bg-emerald-100 text-emerald-700 p-2 rounded-lg">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase">
                        Yarın 10:30
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1 truncate">{item.musteri_bilgileri.adi_unvani}</h3>
                    <p className="text-sm font-mono text-slate-500 mb-4">{item.arac_bilgileri.sasi_no}</p>
                    
                    <div className="bg-slate-50 rounded-xl p-3 text-sm">
                      <p className="text-slate-600 mb-1"><span className="font-medium text-slate-900">İşlem:</span> {item.bakim_nedeni}</p>
                      <p className="text-slate-600"><span className="font-medium text-slate-900">Tutar:</span> {item.finans_ve_fiyatlandirma.toplam_tavsiye_edilen_satis_fiyati}</p>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">Henüz alınmış bir randevu bulunmuyor.</p>
                    <p className="text-sm text-slate-400 mt-1">Bugün aranacaklar listesinden müşterilerle görüşerek randevu oluşturabilirsiniz.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* AI Chat Widget */}
        <div className="fixed bottom-6 right-6 z-50">
          {isChatOpen ? (
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-[calc(100vw-3rem)] sm:w-96 flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right">
              <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5" />
                  <span className="font-bold">AI Danışman Asistanı</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-indigo-200 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="h-80 overflow-y-auto p-4 bg-slate-50 flex flex-col gap-3">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-sm shadow-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-white border-t border-slate-100">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Asistana sorun..." 
                    className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl px-3 py-2 text-sm transition-all outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button onClick={handleSendMessage} className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors shrink-0">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setIsChatOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            >
              <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>

      </main>
    </div>
  );
}
