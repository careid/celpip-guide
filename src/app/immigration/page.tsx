import { Plane } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { TipBox } from "@/components/TipBox";

const expressEntryPrograms = [
  {
    program: "Federal Skilled Worker Program (FSWP)",
    minimum: "CLB 7 in ALL 4 skills",
    notes: "All four skills must meet CLB 7. A single skill below CLB 7 makes you ineligible.",
    eligibility: "Foreign skilled workers with work experience outside Canada",
    badge: "bg-blue-100 text-blue-800",
  },
  {
    program: "Canadian Experience Class (CEC)",
    minimum: "CLB 5–7 (varies by occupation)",
    notes: "TEER 0 or 1 occupations: CLB 7 (L+S), CLB 6 (R+W). TEER 2 or 3: CLB 5. Applies to those with Canadian work experience.",
    eligibility: "People with at least 1 year of skilled work experience in Canada",
    badge: "bg-green-100 text-green-800",
  },
  {
    program: "Federal Skilled Trades Program (FSTP)",
    minimum: "CLB 5 (L+S) / CLB 4 (R+W)",
    notes: "Lower language bar compared to FSWP. Still requires meeting minimums in all 4 skills.",
    eligibility: "Skilled trades workers (electricians, plumbers, carpenters, etc.)",
    badge: "bg-orange-100 text-orange-800",
  },
];

const crsLanguagePoints = [
  { clb: 10, l: 29, r: 29, w: 32, s: 32, total: 122 },
  { clb: 9, l: 23, r: 23, w: 25, s: 25, total: 96 },
  { clb: 8, l: 17, r: 17, w: 20, s: 20, total: 74 },
  { clb: 7, l: 9, r: 9, w: 10, s: 10, total: 38 },
];

const provincialPrograms = [
  { province: "Ontario (OINP)", min: "CLB 7–10 (stream dependent)", note: "Human Capital Priorities and Masters Graduate streams have high language bar" },
  { province: "British Columbia (BC PNP)", min: "CLB 4–8 (stream dependent)", note: "Tech streams and skilled workers streams vary" },
  { province: "Alberta (AAIP)", min: "CLB 4–7 (stream dependent)", note: "Rural Renewal Stream and Alberta Advantage Stream" },
  { province: "Saskatchewan (SINP)", min: "CLB 4–7", note: "Depends on occupation and pathway" },
  { province: "Manitoba (MPNP)", min: "CLB 5–7", note: "Higher for skilled workers, lower for semi-skilled" },
  { province: "Nova Scotia (NSNP)", min: "CLB 7", note: "Labour Market Priorities and Skilled Worker streams" },
];

const professsionalBodies = [
  { body: "Registered Nurses", min: "CLB 7–9", note: "CRNNS, CARNA — varies by province" },
  { body: "Licensed Practical Nurses", min: "CLB 6–7", note: "Various provincial nursing associations" },
  { body: "Engineers (PEng)", min: "CLB 7–8", note: "Engineers Canada and provincial associations" },
  { body: "Teachers", min: "CLB 7–8", note: "Provincial Colleges of Education" },
  { body: "Pharmacists", min: "CLB 8", note: "PEBC requirement" },
  { body: "Social Workers", min: "CLB 6–7", note: "CASW-affiliated provincial associations" },
  { body: "Early Childhood Educators", min: "CLB 5–7", note: "Provincial licensing bodies" },
];

export default function ImmigrationPage() {
  return (
    <div>
      <SectionHeader
        icon={Plane}
        title="Immigration Requirements"
        subtitle="Express Entry, citizenship, provincial programs, and professional licensing — what score do you need?"
        color="red"
        stats={[
          { label: "Express Entry min", value: "CLB 7" },
          { label: "Citizenship min", value: "CLB 4" },
          { label: "Max CRS points", value: "122" },
          { label: "Test validity (EE)", value: "2 yrs" },
        ]}
      />

      {/* Express Entry */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Express Entry Programs</h2>
      <div className="space-y-4 mb-10">
        {expressEntryPrograms.map((prog) => (
          <div key={prog.program} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h3 className="font-bold text-gray-900">{prog.program}</h3>
              <span className={`text-xs font-bold rounded-full px-3 py-1 ${prog.badge}`}>{prog.minimum}</span>
            </div>
            <p className="text-sm text-gray-600 mb-1"><strong>Eligibility:</strong> {prog.eligibility}</p>
            <p className="text-sm text-gray-700">{prog.notes}</p>
          </div>
        ))}
      </div>

      <TipBox variant="warning" title="Per-skill minimums are strict">
        Express Entry is strict: if any ONE skill falls below the minimum CLB level, you do not qualify for that program. A CLB 7 in 3 skills and CLB 6 in Writing = INELIGIBLE for FSWP. All 4 skills must meet the minimum.
      </TipBox>

      {/* CRS Points maximizer */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Maximizing CRS Language Points</h2>
      <Card className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">First Official Language (English) — CRS Points by Skill</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border border-gray-200 font-semibold">CLB Level</th>
                <th className="text-center p-3 border border-gray-200 font-semibold">Listening</th>
                <th className="text-center p-3 border border-gray-200 font-semibold">Reading</th>
                <th className="text-center p-3 border border-gray-200 font-semibold">Writing</th>
                <th className="text-center p-3 border border-gray-200 font-semibold">Speaking</th>
                <th className="text-center p-3 border border-gray-200 font-semibold font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {crsLanguagePoints.map((row, i) => (
                <tr key={row.clb} className={`${row.clb === 10 ? "bg-green-50 font-medium" : i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <td className="p-3 border border-gray-200 font-bold text-gray-900">
                    CLB {row.clb}{row.clb === 10 && <span className="ml-2 text-xs text-green-600 font-medium">(max)</span>}
                  </td>
                  <td className="p-3 border border-gray-200 text-center text-gray-700">{row.l}</td>
                  <td className="p-3 border border-gray-200 text-center text-gray-700">{row.r}</td>
                  <td className="p-3 border border-gray-200 text-center text-gray-700">{row.w}</td>
                  <td className="p-3 border border-gray-200 text-center text-gray-700">{row.s}</td>
                  <td className="p-3 border border-gray-200 text-center font-bold text-brand-700">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">CLB 11 and 12 do not earn additional points beyond CLB 10.</p>
      </Card>

      {/* CRS impact example */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <Card title="Scenario: CLB 9 across all skills">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Listening (CLB 9)</span><span className="font-bold text-teal-700">+23 pts</span></div>
            <div className="flex justify-between"><span>Reading (CLB 9)</span><span className="font-bold text-teal-700">+23 pts</span></div>
            <div className="flex justify-between"><span>Writing (CLB 9)</span><span className="font-bold text-teal-700">+25 pts</span></div>
            <div className="flex justify-between"><span>Speaking (CLB 9)</span><span className="font-bold text-teal-700">+25 pts</span></div>
            <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-lg"><span>Total</span><span className="text-brand-700">96 pts</span></div>
          </div>
        </Card>
        <Card title="Scenario: CLB 10 across all skills">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Listening (CLB 10)</span><span className="font-bold text-teal-700">+29 pts</span></div>
            <div className="flex justify-between"><span>Reading (CLB 10)</span><span className="font-bold text-teal-700">+29 pts</span></div>
            <div className="flex justify-between"><span>Writing (CLB 10)</span><span className="font-bold text-teal-700">+32 pts</span></div>
            <div className="flex justify-between"><span>Speaking (CLB 10)</span><span className="font-bold text-teal-700">+32 pts</span></div>
            <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-lg"><span>Total</span><span className="text-brand-700">122 pts</span></div>
          </div>
          <p className="text-xs text-green-700 mt-2 font-medium">+26 CRS points by going from CLB 9 to CLB 10 in all skills</p>
        </Card>
      </div>

      {/* Canadian Citizenship */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Canadian Citizenship Requirements</h2>
      <Card className="mb-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Who needs a language test?</h4>
            <p className="text-sm text-gray-700 mb-3">Adults aged <strong>18–54</strong> must demonstrate CLB 4 in <strong>Speaking and Listening</strong> only. Reading and Writing are not required for citizenship.</p>
            <h4 className="font-semibold text-gray-900 mb-2">Which CELPIP test?</h4>
            <p className="text-sm text-gray-700">
              For citizenship, you can use either:
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li><strong>CELPIP-General-LS</strong> (Listening + Speaking only, ~70 min) — cheaper and shorter</li>
                <li><strong>CELPIP-General</strong> (all 4 skills) — valid too, only L+S assessed</li>
              </ul>
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Score validity for citizenship</h4>
            <p className="text-sm text-gray-700 mb-3">Unlike Express Entry (2-year validity), IRCC does <strong>not impose an expiry</strong> on language test scores for citizenship applications. Older test results are accepted.</p>
            <h4 className="font-semibold text-gray-900 mb-2">Who is exempt?</h4>
            <p className="text-sm text-gray-700">Applicants under 18 or over 54 are exempt from the language requirement for Canadian citizenship.</p>
          </div>
        </div>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-amber-700 mb-1">CLB 4</div>
          <div className="text-sm font-semibold text-amber-800">Citizenship Minimum</div>
          <div className="text-xs text-amber-700 mt-1">Listening + Speaking only</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-gray-700 mb-1">18–54</div>
          <div className="text-sm font-semibold text-gray-700">Age Range Required</div>
          <div className="text-xs text-gray-500 mt-1">Under 18 & over 54 exempt</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-green-700 mb-1">No</div>
          <div className="text-sm font-semibold text-green-800">Test Expiry</div>
          <div className="text-xs text-green-700 mt-1">Citizenship accepts any score age</div>
        </div>
      </div>

      {/* Provincial Programs */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Provincial Nominee Programs (PNP)</h2>
      <TipBox variant="info" title="PNP requirements vary significantly">
        Each province sets its own language minimums by stream. Always check the current requirements directly from the provincial website — they change frequently. Below are general guidelines only.
      </TipBox>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-700">Province / Program</th>
              <th className="text-left p-3 font-semibold text-gray-700">General Minimum</th>
              <th className="text-left p-3 font-semibold text-gray-700 hidden sm:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody>
            {provincialPrograms.map((row, i) => (
              <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <td className="p-3 font-medium text-gray-800">{row.province}</td>
                <td className="p-3 text-brand-700 font-medium">{row.min}</td>
                <td className="p-3 text-gray-600 text-xs hidden sm:table-cell">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Professional Bodies */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Licensing Requirements</h2>
      <p className="text-gray-600 text-sm mb-4">17+ Canadian professional regulatory bodies accept CELPIP. Requirements vary by organization.</p>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-700">Profession</th>
              <th className="text-left p-3 font-semibold text-gray-700">Typical Minimum</th>
              <th className="text-left p-3 font-semibold text-gray-700 hidden sm:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody>
            {professsionalBodies.map((row, i) => (
              <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <td className="p-3 font-medium text-gray-800">{row.body}</td>
                <td className="p-3 text-brand-700 font-medium">{row.min}</td>
                <td className="p-3 text-gray-600 text-xs hidden sm:table-cell">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TipBox variant="warning" title="Always verify directly">
        Language requirements for professional bodies change. Before booking your CELPIP test, confirm the current requirements directly with the regulatory body you are applying to.
      </TipBox>

      {/* CELPIP vs IELTS comparison */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">CELPIP vs IELTS — Which Should You Choose?</h2>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-700">Aspect</th>
              <th className="text-center p-3 font-semibold text-brand-700">CELPIP</th>
              <th className="text-center p-3 font-semibold text-gray-700">IELTS General</th>
            </tr>
          </thead>
          <tbody>
            {[
              { aspect: "Format", celpip: "Fully computer-based", ielts: "Paper-based writing; computer speaking (some centres)" },
              { aspect: "Test duration", celpip: "~3 hours (all in one sitting)", ielts: "~2h 45min (separate Speaking)" },
              { aspect: "Speaking", celpip: "Computer-recorded; no human examiner", ielts: "Face-to-face with examiner" },
              { aspect: "Writing", celpip: "Typed on computer", ielts: "Handwritten (usually)" },
              { aspect: "Canadian context", celpip: "Canadian English, accents, situations", ielts: "British English focus" },
              { aspect: "CLB mapping", celpip: "Direct 1:1 (CELPIP 7 = CLB 7)", ielts: "Requires conversion table" },
              { aspect: "Results time", celpip: "4–8 days", ielts: "13 days (paper); 3–5 days (computer)" },
              { aspect: "Recognition", celpip: "IRCC + 17 professional bodies", ielts: "IRCC + wider international recognition" },
              { aspect: "Best for", celpip: "Canadian immigrants comfortable with computers", ielts: "International applicants, wider acceptance" },
            ].map((row, i) => (
              <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <td className="p-3 font-medium text-gray-700">{row.aspect}</td>
                <td className="p-3 text-center text-blue-800 text-xs">{row.celpip}</td>
                <td className="p-3 text-center text-gray-600 text-xs">{row.ielts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
