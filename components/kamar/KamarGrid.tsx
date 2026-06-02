

import React from "react";
import { BedDouble, Info, CheckCircle2, Hammer, Users } from "lucide-react";

interface KamarProps {
  kamarList: any[];
}

export function KamarGrid({ kamarList }: KamarProps) {
  if (kamarList.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center p-12 rounded-3xl text-center border-2 border-dashed"
        style={{ borderColor: "var(--border)", background: "var(--bg-muted)" }}
      >
        <BedDouble className="w-12 h-12 mb-4" style={{ color: "var(--text-xmuted)" }} />
        <h3 className="text-lg font-black" style={{ color: "var(--text-main)" }}>
          Belum ada kamar
        </h3>
        <p className="text-sm max-w-sm mt-2" style={{ color: "var(--text-muted)" }}>
          Gunakan tombol Tambah Kamar untuk mulai memasukkan data kamar ke sistem.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {kamarList.map((k) => {
        let badgeClass = "badge badge-terisi";
        let StatusIcon = CheckCircle2;
        let cardBg = "var(--status-terisi-bg)";
        let cardBorder = "var(--status-terisi-border)";

        if (k.status === "tersedia") {
          badgeClass = "badge badge-tersedia";
          StatusIcon = Info;
          cardBg = "var(--status-tersedia-bg)";
          cardBorder = "var(--status-tersedia-border)";
        } else if (k.status === "maintenance") {
          badgeClass = "badge badge-maintenance";
          StatusIcon = Hammer;
          cardBg = "var(--status-maintenance-bg)";
          cardBorder = "var(--status-maintenance-border)";
        }

        return (
          <div
            key={k.id}
            className="group card rounded-3xl p-5 transition-all duration-300 cursor-pointer hover:-translate-y-1"
            style={{ background: "var(--surface)" }}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
                >
                  <BedDouble className="w-5 h-5" style={{ color: "var(--primary)" }} />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg leading-none" style={{ color: "var(--text-main)" }}>
                    {k.nomor}
                  </h3>
                  <p className="text-[11px] font-semibold mt-1 uppercase tracking-wider" style={{ color: "var(--text-xmuted)" }}>
                    {k.tipe}
                  </p>
                </div>
              </div>
              <span className={badgeClass}>
                <StatusIcon className="w-3 h-3" />
                {capitalize(k.status)}
              </span>
            </div>

            {/* Detail */}
            <div className="space-y-2.5 mb-5">
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: "var(--text-muted)" }}>Lantai</span>
                <span className="font-bold" style={{ color: "var(--text-sub)" }}>{k.lantai}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: "var(--text-muted)" }}>Harga/Bulan</span>
                <span className="font-extrabold" style={{ color: "var(--primary-dark)" }}>
                  Rp {k.harga_per_bulan?.toLocaleString("id-ID")}
                </span>
              </div>

              <div
                className="flex items-center gap-2 text-sm pt-2.5 mt-2.5"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <Users className="w-4 h-4 flex-shrink-0" style={{ color: "var(--text-xmuted)" }} />
                <span
                  className="truncate font-medium"
                  style={{ color: k.kontrak?.[0]?.penghuni ? "var(--text-sub)" : "var(--text-xmuted)" }}
                >
                  {k.kontrak?.[0]?.penghuni?.full_name || "Belum ada penghuni"}
                </span>
              </div>
            </div>

            {/* Action */}
            <button
              className="w-full py-2.5 rounded-xl text-sm font-bold transition-all group-hover:bg-[var(--primary-light)] group-hover:text-[var(--primary-dark)] group-hover:border-[var(--primary-border)] hover:!bg-[var(--primary)] hover:!text-white"
              style={{
                background: "var(--bg-muted)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              Lihat Detail
            </button>
          </div>
        );
      })}
    </div>
  );
}

function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
