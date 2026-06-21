import { getAllKamar, getKamarStats } from '@/lib/dal/kamar'
import { KamarGrid } from '@/components/kamar/KamarGrid'
import { KamarGridSkeleton } from '@/components/kamar/KamarGridSkeleton'
import StatCard from '@/components/dashboard/StatCard'
import { Suspense } from 'react'
import { BedDouble, Users, Wrench, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default async function KamarPage() {
  const [kamarList, stats] = await Promise.all([getAllKamar(), getKamarStats()])

  return (
    <main className="p-6 lg:p-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "var(--text-main)" }}>
            Manajemen Kamar
          </h1>
          <p className="text-sm font-medium mt-1" style={{ color: "var(--text-muted)" }}>
            Kelola seluruh kamar properti indekos kamu
          </p>
        </div>
        <Link href="/dashboard/admin/kamar/tambah" className="btn-primary self-start sm:self-auto flex items-center gap-2" style={{ textDecoration: 'none' }}>
          <span className="text-lg leading-none">+</span>
          Tambah Kamar
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger">
        <StatCard title="Total Kamar"   value={stats.total}       icon={BedDouble}     iconBg="var(--bg-muted)"               iconColor="var(--text-muted)"   delay={0} />
        <StatCard title="Terisi"        value={stats.terisi}      icon={Users}         iconBg="var(--status-terisi-bg)"       iconColor="var(--status-terisi)" delay={60} />
        <StatCard title="Tersedia"      value={stats.tersedia}    icon={CheckCircle2}  iconBg="var(--status-tersedia-bg)"     iconColor="var(--status-tersedia)" delay={120} />
        <StatCard title="Maintenance"   value={stats.maintenance} icon={Wrench}        iconBg="var(--status-maintenance-bg)"  iconColor="var(--status-maintenance)" delay={180} />
      </div>

      {/* Grid */}
      <Suspense fallback={<KamarGridSkeleton />}>
        <KamarGrid kamarList={kamarList} />
      </Suspense>
    </main>
  )
}
