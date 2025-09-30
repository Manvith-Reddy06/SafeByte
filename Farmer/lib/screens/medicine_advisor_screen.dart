import 'package:flutter/material.dart';

class MedicineAdvisorScreen extends StatefulWidget {
  const MedicineAdvisorScreen({super.key});

  @override
  State<MedicineAdvisorScreen> createState() => _MedicineAdvisorScreenState();
}

class _MedicineAdvisorScreenState extends State<MedicineAdvisorScreen> {
  String? species;
  String? severity = 'Moderate - Noticeable symptoms';
  final weightController = TextEditingController();
  final symptomsController = TextEditingController();

  final List<String> speciesList = ['Cow', 'Buffalo', 'Goat', 'Sheep', 'Other'];
  final List<String> severityList = [
    'Mild - Minor symptoms',
    'Moderate - Noticeable symptoms',
    'Severe - Critical symptoms',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Medicine Advisor'), leading: BackButton()),
      body: ListView(
        padding: EdgeInsets.all(20),
        children: [
          Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.blue[50],
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                Icon(Icons.medication, color: Colors.green),
                SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'Get AI-powered medicine recommendations for your livestock. Describe the symptoms and we\'ll suggest appropriate treatments.',
                    style: TextStyle(fontSize: 15),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 20),
          Card(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            child: Padding(
              padding: EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Animal Information',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                  ),
                  SizedBox(height: 16),
                  Text('Species *'),
                  DropdownButtonFormField<String>(
                    initialValue: species,
                    hint: Text('Select species'),
                    items: speciesList
                        .map((s) => DropdownMenuItem(value: s, child: Text(s)))
                        .toList(),
                    onChanged: (val) => setState(() => species = val),
                  ),
                  SizedBox(height: 16),
                  Text('Animal Weight (kg)'),
                  TextField(
                    controller: weightController,
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(hintText: 'Enter weight in kg'),
                  ),
                  SizedBox(height: 16),
                  Text('Symptoms *'),
                  TextField(
                    controller: symptomsController,
                    maxLines: 2,
                    decoration: InputDecoration(
                      hintText:
                          'Describe the symptoms (e.g., respiratory infection, digestive issues, lameness, fever)',
                    ),
                  ),
                  SizedBox(height: 16),
                  Text('Severity'),
                  DropdownButtonFormField<String>(
                    initialValue: severity,
                    items: severityList
                        .map((s) => DropdownMenuItem(value: s, child: Text(s)))
                        .toList(),
                    onChanged: (val) => setState(() => severity = val),
                  ),
                  SizedBox(height: 24),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      icon: Icon(Icons.search),
                      label: Text('Get Medicine Suggestions'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.green,
                        foregroundColor: Colors.white,
                        padding: EdgeInsets.symmetric(vertical: 16),
                        textStyle: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      onPressed: () {
                        // Implement medicine suggestion logic here
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Medicine suggestions coming soon!'),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
