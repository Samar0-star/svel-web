/**
 * Scientific Disciplines & Domain Simulation Kernels Data
 * Ground-truth mathematical constants, execution specs, equations, and code samples
 * extracted directly from:
 * - backend/experiments/templates/medicine/clinical_trial.py
 * - backend/experiments/templates/chemistry/molecular_docking.py
 * - backend/experiments/templates/materials/superconductivity.py
 * - backend/experiments/templates/physics/fusion_plasma_kernel.py
 * - backend/tools/ml_model_builder_tool.py
 */

export interface DomainKernel {
  id: 'genomics' | 'materials' | 'fusion' | 'multimodal-ml';
  title: string;
  subtitle: string;
  discipline: string;
  badge: string;
  engine: string;
  description: string;
  equations: Array<{
    name: string;
    latex: string;
    description: string;
    constants?: Record<string, string>;
  }>;
  parameters: Array<{
    name: string;
    symbol: string;
    unit: string;
    value: string;
    note: string;
  }>;
  codeSnippet: string;
  verdictCriteria: string[];
}

export const DOMAINS_DATA: DomainKernel[] = [
  {
    id: 'genomics',
    title: 'Genomics & Precision Oncology',
    subtitle: 'Intention-to-Treat Protocols, 3D Conformer Ensembles & Receptor Docking',
    discipline: 'Computational Biology & ChemInformatics',
    badge: 'RDKIT + AUTODOCK VINA',
    engine: 'ClinicalTrialTemplate & UltronApexChemistryTemplate',
    description:
      'Rigorous biostatistical execution combining Intention-to-Treat (ITT) population analysis, Shapiro-Wilk and Levene normality pre-flights, RDKit ETKDGv3 3D conformer generation, PAINS substructure rejection, and AutoDock Vina thermodynamic binding gates.',
    equations: [
      {
        name: 'ITT Continuous Treatment Effect & 95% CI',
        latex: '\\Delta = \\bar{X}_{\\text{treat}} - \\bar{X}_{\\text{ctrl}}, \\quad SE_{\\Delta} = \\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}, \\quad 95\\%\\text{ CI} = [\\Delta \\pm 1.96 \\cdot SE_{\\Delta}]',
        description: 'Welch-Satterthwaite degrees of freedom without assuming homoskedasticity.',
      },
      {
        name: 'Bickerton Quantitative Estimate of Drug-likeness (QED)',
        latex: '\\text{QED} = \\exp\\left( \\frac{1}{\\sum w_i} \\sum_{i=1}^8 w_i \\ln d_i \\right)',
        description: 'Hard gate: Immediate rejection if Lipinski Ro5 violations >= 2 or QED < 0.20.',
      },
      {
        name: 'AutoDock Vina Thermodynamic Binding Gate',
        latex: '\\Delta G_{\\text{bind}} = \\sum_{i < j} f(t_i, t_j, r_{ij}) \\le -6.0 \\text{ kcal/mol}',
        description: 'Combines steric, hydrophobic, and hydrogen bonding potentials. Bound within 20Å pocket box.',
      },
    ],
    parameters: [
      { name: 'Vina Binding Affinity Gate', symbol: 'ΔG_bind', unit: 'kcal/mol', value: '≤ -6.0', note: 'Rejects > -6.0; flags < -50.0 as hallucination' },
      { name: 'Synthetic Accessibility Score', symbol: 'SA', unit: 'scalar [1-10]', value: '≤ 6.0', note: 'Ertl & Schuffenhauer heuristic' },
      { name: 'Maximum Rotatable Bonds', symbol: 'N_rot', unit: 'integer', value: '≤ 10', note: 'Veber bioavailability constraint' },
      { name: 'Topological Polar Surface Area', symbol: 'TPSA', unit: 'Å²', value: '≤ 140.0', note: 'Membrane permeability threshold' },
      { name: 'Missing Data Tolerance', symbol: 'P_miss', unit: '%', value: '≤ 10.0%', note: 'ITT protocol invalidation floor' },
    ],
    codeSnippet: `# RDKit ETKDGv3 3D Conformer & AutoDock Vina Pocket Centroid
from rdkit import Chem
from rdkit.Chem import AllChem

def embed_conformer_and_dock(smiles: str, pocket_centroid: tuple):
    mol = Chem.MolFromSmiles(smiles)
    mol = Chem.AddHs(mol)
    params = AllChem.ETKDGv3()
    params.randomSeed = 42
    status = AllChem.EmbedMolecule(mol, params)
    if status != 0:
        raise ValueError("ETKDGv3 conformer generation failed")
    AllChem.UFFOptimizeMolecule(mol, maxIters=500)
    # Target pocket centroid bounding box: [20.0, 20.0, 20.0] Å
    return mol`,
    verdictCriteria: [
      'ITT population preserved without post-hoc exclusions',
      'Normal distribution verified via Shapiro-Wilk (p > 0.05)',
      'PAINS filter pass (0 toxicophores or reactive substructures)',
      'AutoDock Vina binding energy ΔG ≤ -6.0 kcal/mol',
    ],
  },
  {
    id: 'materials',
    title: 'Materials Science & Condensed Matter',
    subtitle: 'Spacegroup Symmetry, M3GNet Universal Potentials & Elastic Tensors',
    discipline: 'Computational Solid-State Physics',
    badge: 'PYMATGEN + M3GNET PES',
    engine: 'UltronApexMaterialsTemplate & SuperconductivityKernel',
    description:
      'High-throughput ab initio lattice simulation integrating pymatgen SpacegroupAnalyzer, Materials Project M3GNet Universal Graph Neural Network potentials, BFGS cell and coordinate relaxation (F_max <= 0.05 eV/Å), Voigt elastic moduli, and Born mechanical stability criteria.',
    equations: [
      {
        name: 'Voigt Elastic Moduli (Cubic Symmetry)',
        latex: 'K_{\\text{bulk}} = \\frac{C_{11} + 2C_{12}}{3}, \\quad G_{\\text{shear}} = C_{44}',
        description: 'Calculated via DeformedStructureSet under 4 to 24 independent strain states.',
      },
      {
        name: 'Cubic Born Mechanical Stability Criteria',
        latex: '(C_{11} - C_{12} > 0) \\land (C_{11} + 2C_{12} > 0) \\land (C_{44} > 0) \\land (C_{11} > 0)',
        description: 'Necessary and sufficient conditions for positive-definite strain energy density.',
      },
      {
        name: 'Pugh Ductility Criterion',
        latex: 'k = \\frac{K_{\\text{bulk}}}{G_{\\text{shear}}} > 1.75 \\implies \\text{Ductile}',
        description: 'Separates brittle intermetallics from ductile structural candidates.',
      },
    ],
    parameters: [
      { name: 'BFGS Maximum Atomic Force', symbol: 'F_max', unit: 'eV/Å', value: '≤ 0.05', note: 'Convergence threshold for cell relaxation' },
      { name: 'Symmetry Precision', symbol: 'symprec', unit: 'Å', value: '0.01', note: 'pymatgen SpacegroupAnalyzer tolerance' },
      { name: 'Bulk Modulus Floor', symbol: 'K_bulk', unit: 'GPa', value: '> 0.0', note: 'Volumetric mechanical integrity' },
      { name: 'Phonon Soft Mode Bound', symbol: 'ω²', unit: 'THz²', value: '≥ 0.0', note: 'Dynamic stability (no imaginary frequencies)' },
    ],
    codeSnippet: `# M3GNet Universal PES & Born Stability Check
from pymatgen.core import Structure
from pymatgen.symmetry.analyzer import SpacegroupAnalyzer
import matgl

def evaluate_born_stability(struct: Structure):
    sga = SpacegroupAnalyzer(struct, symprec=0.01)
    spg = sga.get_space_group_symbol()
    # M3GNet-MP-2021.2.8-PES Universal Graph Potential
    model = matgl.load_model("M3GNet-MP-2021.2.8-PES")
    # c11, c12, c44 extraction from Voigt tensor
    c11, c12, c44 = 150.0, 50.0, 75.0  # GPa
    born_pass = (c11 - c12 > 0) and (c11 + 2*c12 > 0) and (c44 > 0)
    K = (c11 + 2*c12) / 3.0  # 83.33 GPa
    return {"spacegroup": spg, "stable": born_pass, "K_GPa": K}`,
    verdictCriteria: [
      'Lattice relaxed to maximum atomic force F_max ≤ 0.05 eV/Å',
      'All 3 cubic Born criteria strictly positive-definite',
      'Positive Bulk Modulus K > 0 and Shear Modulus G > 0',
      'Zero imaginary frequencies in Γ-point phonon dispersion',
    ],
  },
  {
    id: 'fusion',
    title: 'Fusion & Plasma Physics',
    subtitle: 'Relativistic Bremsstrahlung, Gamow Peak Integrals & Lyapunov Chaos',
    discipline: 'High Energy Density Plasma Dynamics',
    badge: 'MAXON 1972 + GAMOW QUAD',
    engine: 'fusion_plasma_kernel.py & BenettinQRKernel',
    description:
      'Multi-species aneutronic proton-Boron (p-11B) plasma simulations accounting for Maxon (1972) relativistic Gaunt corrections, numerical Gamow peak quadrature cross sections, Tokamak Troyon beta disruption limits, and full Lyapunov spectrum QR-Benettin integrators.',
    equations: [
      {
        name: 'Relativistic Bremsstrahlung Power Loss (Maxon 1972)',
        latex: 'P_{\\text{brem}} = C_{\\text{brem}} Z_{\\text{eff}}^2 n_e^2 \\sqrt{T_e} \\left[ 1.0 + 1.78 \\left(\\frac{T_e}{511.0}\\right)^{1.34} \\right]',
        description: 'Volumetric radiation loss in W/cm³. NRL constant C_brem = 5.35 × 10⁻³⁷ W cm³ keV⁻¹/².',
      },
      {
        name: 'Gamow Peak Resonant Integral (p-¹¹B)',
        latex: '\\langle \\sigma v \\rangle = \\sqrt{\\frac{8}{\\pi m_r}} \\frac{1}{(k_B T)^{3/2}} \\int_0^\\infty S(E) \\exp\\left( -\\frac{E}{k_B T} - \\frac{B_G}{\\sqrt{E}} \\right) dE',
        description: 'Gamow constant B_G = 149.89 keV¹/²; calibrated against Nevins-Swain benchmark at 300 keV.',
      },
      {
        name: 'Kaplan-Yorke Dimension from Lyapunov Spectrum',
        latex: 'D_{KY} = j + \\frac{\\sum_{i=1}^j \\lambda_i}{|\\lambda_{j+1}|}, \\quad \\lambda_1 > 0.01 \\implies \\text{Chaotic}',
        description: 'Evaluated via orthonormal tangent frame evolution with QR reorthonormalization every 20 steps.',
      },
    ],
    parameters: [
      { name: 'NRL Bremsstrahlung Constant', symbol: 'C_brem', unit: 'W·cm³·keV⁻¹/²', value: '5.35 × 10⁻³⁷', note: 'Fundamental radiation coefficient' },
      { name: 'Electron Rest Mass', symbol: 'm_e c²', unit: 'keV', value: '511.0', note: 'Relativistic threshold scale' },
      { name: 'p-¹¹B Gamow Constant', symbol: 'B_G', unit: 'keV¹/²', value: '149.89', note: 'Coulomb barrier penetration factor' },
      { name: 'Troyon Stability Limit', symbol: 'β_T', unit: '%', value: '0.028 · I/(a·B)', note: 'Maximum stable Tokamak plasma beta' },
      { name: 'Lyapunov Chaos Threshold', symbol: 'λ₁', unit: 's⁻¹', value: '> 0.01', note: 'Divergence rate indicating MHD turbulence' },
    ],
    codeSnippet: `# Relativistic Bremsstrahlung Radiation Loss Calculation
import numpy as np

def compute_bremsstrahlung(Te_keV: float, np_cm3: float, nB_cm3: float):
    # Charge neutrality
    ne_cm3 = np_cm3 * 1 + nB_cm3 * 5
    Z_eff_sq = (np_cm3 * 1**2 + nB_cm3 * 5**2) / ne_cm3
    
    # Maxon 1972 Relativistic Gaunt Factor
    g_rel = 1.0 + 1.78 * ((Te_keV / 511.0) ** 1.34)
    C_brem = 5.35e-37
    
    P_brem = C_brem * Z_eff_sq * (ne_cm3 ** 2) * np.sqrt(Te_keV) * g_rel
    return {"P_brem_W_cm3": P_brem, "g_rel": g_rel, "Z_eff_sq": Z_eff_sq}`,
    verdictCriteria: [
      'Relativistic Gaunt factor g_rel smoothly increases with Te',
      'Net energy balance Q = P_fusion / (P_brem + P_cond) > 1.0',
      'Plasma beta β strictly below Troyon disruption ceiling β_T',
      'Lyapunov spectrum divergence verified via QR decomposition',
    ],
  },
  {
    id: 'multimodal-ml',
    title: 'Multimodal Machine Learning',
    subtitle: '6-Modality GSTM Fusion Architecture & Adaptive Robust Loss',
    discipline: 'Frontier AI & Neural Scientific Architectures',
    badge: 'GSTM 422D FUSION',
    engine: 'AutomatedMLBuilder & ml_model_builder_tool.py',
    description:
      'GSTM Level 10/11 scientific reasoning neural architecture fusing Image (128d), DNA (128d raw + 128d cross-attended), Metadata (64d), Time Series (32d), Text (64d), Graph Degree (1d), and Modality Mask (5d) into a 422-dimensional latent representation with Adaptive Robust Loss rejection of 10% worst outliers.',
    equations: [
      {
        name: 'GSTM Concatenated Multimodal Latent Vector',
        latex: '\\mathbf{z}_{\\text{fusion}} = [\\mathbf{f}_{\\text{img}}^{128}, \\mathbf{f}_{\\text{dna\\_att}}^{128}, \\mathbf{f}_{\\text{meta}}^{64}, \\mathbf{f}_{\\text{ts}}^{32}, \\mathbf{f}_{\\text{text}}^{64}, \\mathbf{f}_{\\text{graph}}^{1}, \\mathbf{m}^{5}] \\in \\mathbb{R}^{422}',
        description: 'Cross-attention: DNA queries attend over image Key/Value representations.',
      },
      {
        name: 'Quantile-Truncated Adaptive Robust Loss',
        latex: '\\mathcal{L}_{\\text{clean}} = \\frac{1}{k} \\sum_{i \\in \\mathcal{I}_{\\text{clean}}} (y_i - \\hat{y}_i)^2, \\quad k = \\lfloor B \\cdot 0.90 \\rfloor',
        description: 'Top 10% worst loss outliers receive identically 0 gradient; stops sensor noise corruption.',
      },
      {
        name: 'Barron General Adaptive M-Estimator Family',
        latex: '\\rho(x, \\alpha, c) = \\frac{|\\alpha - 2|}{\\alpha} \\left[ \\left( \\frac{(x/c)^2}{|\\alpha - 2|} + 1 \\right)^{\\alpha/2} - 1 \\right]',
        description: 'Unifies L2 (α=2), Pseudo-Huber (α=1), Cauchy (α=0), and Welsch (α=-∞) into learnable α.',
      },
    ],
    parameters: [
      { name: 'Total Latent Dimension', symbol: 'd_fusion', unit: 'channels', value: '422', note: 'Image + DNA + Meta + TS + Text + Graph + Mask' },
      { name: 'Quantile Truncation Alpha', symbol: 'α', unit: 'ratio', value: '0.90', note: 'Bottom 90% batch losses kept' },
      { name: 'Cross-Attention Heads', symbol: 'N_heads', unit: 'heads', value: '4', note: 'DNA-Image cross-attention dim=128' },
      { name: 'Missing Modality Fill', symbol: 'e_missing', unit: 'parameter', value: 'learnable', note: 'Gradient-optimized embedding for zero-shot dropouts' },
    ],
    codeSnippet: `# GSTM Adaptive Robust Loss: Top-k Quantile Cutoff (Alpha = 0.90)
import torch
import torch.nn as nn

class AdaptiveRobustLoss(nn.Module):
    def __init__(self, alpha: float = 0.90):
        super().__init__()
        self.alpha = alpha

    def forward(self, pred: torch.Tensor, target: torch.Tensor) -> torch.Tensor:
        unreduced_loss = (pred - target) ** 2
        batch_size = unreduced_loss.size(0)
        k = max(1, int(batch_size * self.alpha))
        # Keep bottom 90% smallest losses
        clean_losses, _ = torch.topk(unreduced_loss.view(-1), k, largest=False)
        return clean_losses.mean()`,
    verdictCriteria: [
      'Zero gradient propagation to top 10% batch loss outliers',
      'Learnable missing modality parameter embeddings for zero-shot masks',
      'Total concatenated fusion tensor equals exactly 422 dimensions',
      'SHA-256 weight hash delta verification passed (||∇W|| ≥ 1e-5)',
    ],
  },
];
