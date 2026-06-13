import { useState, useEffect } from 'react';
import { Calculator, ChevronDown, ChevronUp } from 'lucide-react';

const METRICS = {
    AV: {
        label: 'Attack Vector',
        options: [
            { value: 'N', label: 'Network', score: 0.85 },
            { value: 'A', label: 'Adjacent', score: 0.62 },
            { value: 'L', label: 'Local', score: 0.55 },
            { value: 'P', label: 'Physical', score: 0.2 },
        ],
    },
    AC: {
        label: 'Attack Complexity',
        options: [
            { value: 'L', label: 'Low', score: 0.77 },
            { value: 'H', label: 'High', score: 0.44 },
        ],
    },
    PR: {
        label: 'Privileges Required',
        options: [
            { value: 'N', label: 'None', score: { U: 0.85, C: 0.85 } },
            { value: 'L', label: 'Low', score: { U: 0.62, C: 0.68 } },
            { value: 'H', label: 'High', score: { U: 0.27, C: 0.5 } },
        ],
    },
    UI: {
        label: 'User Interaction',
        options: [
            { value: 'N', label: 'None', score: 0.85 },
            { value: 'R', label: 'Required', score: 0.62 },
        ],
    },
    S: {
        label: 'Scope',
        options: [
            { value: 'U', label: 'Unchanged' },
            { value: 'C', label: 'Changed' },
        ],
    },
    C: {
        label: 'Confidentiality',
        options: [
            { value: 'N', label: 'None', score: 0 },
            { value: 'L', label: 'Low', score: 0.22 },
            { value: 'H', label: 'High', score: 0.56 },
        ],
    },
    I: {
        label: 'Integrity',
        options: [
            { value: 'N', label: 'None', score: 0 },
            { value: 'L', label: 'Low', score: 0.22 },
            { value: 'H', label: 'High', score: 0.56 },
        ],
    },
    A: {
        label: 'Availability',
        options: [
            { value: 'N', label: 'None', score: 0 },
            { value: 'L', label: 'Low', score: 0.22 },
            { value: 'H', label: 'High', score: 0.56 },
        ],
    },
};

function roundup(input) {
    const intInput = Math.round(input * 100000);
    if (intInput % 10000 === 0) return intInput / 100000;
    return (Math.floor(intInput / 10000) + 1) / 10;
}

function calcScore(vals) {
    const scope = vals.S;
    const avScore = METRICS.AV.options.find(o => o.value === vals.AV)?.score ?? 0;
    const acScore = METRICS.AC.options.find(o => o.value === vals.AC)?.score ?? 0;
    const prOpt = METRICS.PR.options.find(o => o.value === vals.PR);
    const prScore = prOpt ? (typeof prOpt.score === 'object' ? prOpt.score[scope] : prOpt.score) : 0;
    const uiScore = METRICS.UI.options.find(o => o.value === vals.UI)?.score ?? 0;
    const cScore = METRICS.C.options.find(o => o.value === vals.C)?.score ?? 0;
    const iScore = METRICS.I.options.find(o => o.value === vals.I)?.score ?? 0;
    const aScore = METRICS.A.options.find(o => o.value === vals.A)?.score ?? 0;

    const iscBase = 1 - (1 - cScore) * (1 - iScore) * (1 - aScore);
    let isc;
    if (scope === 'U') {
        isc = 6.42 * iscBase;
    } else {
        isc = 7.52 * (iscBase - 0.029) - 3.25 * Math.pow(iscBase - 0.02, 15);
    }

    const esc = 8.22 * avScore * acScore * prScore * uiScore;

    if (isc <= 0) return 0;
    if (scope === 'U') return roundup(Math.min(isc + esc, 10));
    return roundup(Math.min(1.08 * (isc + esc), 10));
}

function getSeverity(score) {
    if (score === 0) return { label: 'None', color: 'text-gray-400', bg: 'bg-gray-500/20' };
    if (score < 4.0) return { label: 'Low', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    if (score < 7.0) return { label: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    if (score < 9.0) return { label: 'High', color: 'text-orange-400', bg: 'bg-orange-500/20' };
    return { label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/20' };
}

function buildVector(vals) {
    return `CVSS:3.1/AV:${vals.AV}/AC:${vals.AC}/PR:${vals.PR}/UI:${vals.UI}/S:${vals.S}/C:${vals.C}/I:${vals.I}/A:${vals.A}`;
}

const INITIAL = { AV: 'N', AC: 'L', PR: 'N', UI: 'N', S: 'U', C: 'N', I: 'N', A: 'N' };

export default function CvssCalculator({ onScoreChange }) {
    const [vals, setVals] = useState(INITIAL);
    const [collapsed, setCollapsed] = useState(false);

    const score = calcScore(vals);
    const severity = getSeverity(score);
    const vector = buildVector(vals);

    useEffect(() => {
        onScoreChange?.(score, vector, severity.label.toLowerCase());
    }, [score, vector]);

    const set = (key, val) => setVals(prev => ({ ...prev, [key]: val }));

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <button
                type="button"
                onClick={() => setCollapsed(c => !c)}
                className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Calculator size={18} className="text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">CVSS 3.1 Score Calculator</span>
                    <span className={`text-sm font-bold px-2 py-0.5 rounded ${severity.bg} ${severity.color}`}>
                        {score.toFixed(1)} – {severity.label}
                    </span>
                </div>
                {collapsed ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronUp size={16} className="text-gray-400" />}
            </button>

            {!collapsed && (
                <div className="p-5 bg-white dark:bg-gray-900 space-y-5">
                    {/* Score Display */}
                    <div className={`flex items-center gap-4 p-4 rounded-xl ${severity.bg}`}>
                        <div className="text-center">
                            <p className={`text-4xl font-black ${severity.color}`}>{score.toFixed(1)}</p>
                            <p className={`text-sm font-semibold ${severity.color}`}>{severity.label}</p>
                        </div>
                        <div className="flex-1">
                            <div className="h-3 bg-white/20 dark:bg-black/20 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${
                                        score >= 9 ? 'bg-red-500' :
                                        score >= 7 ? 'bg-orange-500' :
                                        score >= 4 ? 'bg-yellow-500' :
                                        score > 0  ? 'bg-blue-500' : 'bg-gray-400'
                                    }`}
                                    style={{ width: `${(score / 10) * 100}%` }}
                                />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono break-all">{vector}</p>
                        </div>
                    </div>

                    {/* Exploitability */}
                    <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Exploitability Metrics</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {['AV', 'AC', 'PR', 'UI'].map(key => (
                                <div key={key}>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                        {METRICS[key].label}
                                    </label>
                                    <div className="flex gap-1.5 flex-wrap">
                                        {METRICS[key].options.map(opt => (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => set(key, opt.value)}
                                                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                                                    vals[key] === opt.value
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scope */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Scope</label>
                        <div className="flex gap-1.5">
                            {METRICS.S.options.map(opt => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => set('S', opt.value)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                                        vals.S === opt.value
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Impact */}
                    <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Impact Metrics</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {['C', 'I', 'A'].map(key => (
                                <div key={key}>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                        {METRICS[key].label}
                                    </label>
                                    <div className="flex gap-1.5 flex-wrap">
                                        {METRICS[key].options.map(opt => (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => set(key, opt.value)}
                                                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                                                    vals[key] === opt.value
                                                        ? 'bg-red-600 text-white'
                                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-xs text-gray-400">
                        Score will be auto-filled in the form above. Vector: <span className="font-mono">{vector}</span>
                    </p>
                </div>
            )}
        </div>
    );
}
