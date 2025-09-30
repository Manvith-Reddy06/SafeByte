class DummyAlert {
  final String type; // e.g. 'MRL', 'WITHDRAWAL', 'HEALTH', etc.
  final String icon; // emoji or icon string
  final String title;
  final String description;
  final String? details;

  DummyAlert({
    required this.type,
    required this.icon,
    required this.title,
    required this.description,
    this.details,
  });
}

final List<DummyAlert> dummyAlerts = [
  DummyAlert(
    type: 'MRL',
    icon: '⚠️',
    title: 'MRL ALERT',
    description: '2 days remaining\nDo not collect eggs/meat until cleared',
  ),
  DummyAlert(
    type: 'WITHDRAWAL',
    icon: '✅',
    title: 'WITHDRAWAL COMPLETE',
    description: 'Safe to sell Eggs and meat',
  ),
  DummyAlert(
    type: 'HEALTH',
    icon: '🤖',
    title: 'HEALTH ALERT',
    description:
        'Due to rain, risk of infection\nConsider vaccination for your poultry flock',
  ),
  DummyAlert(
    type: 'PRESCRIPTION',
    icon: '📄',
    title: 'NEW PRESCRIPTION',
    description:
        'Dr. Kumar (VET 003) prescribed Enrofloxacin\nDosage: 10mg/L in drinking water for 5 days',
  ),
  DummyAlert(
    type: 'DRUG',
    icon: '🛒',
    title: 'DRUG REMINDER',
    description:
        'Prescribed Enrofloxacin drug is running low\nReorder now for your flock',
  ),
  DummyAlert(
    type: 'TREATMENT',
    icon: '📝',
    title: 'TREATMENT REMINDER',
    description: 'Next dose: Enrofloxacin\nAdd to drinking water now',
  ),
];
