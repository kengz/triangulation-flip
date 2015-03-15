#include "adjmat.h"
#include <iostream>
#include <sstream>
#include <string>



void AdjMat::handler(int &N, vector<vector<vector<int>>> &group)
{
	// get N
	cout << "Enter number of vertices, N: ";
	cin >> N;
	cout << "Number of vetices, N = " << N << endl;

	string line, token; int i;
	// get first graph
	cout << "Enter two adjacency matrices: " << endl;

	group = vector<vector<vector<int>>>();
	// one graph
	vector<vector<int>> *graph = new vector<vector<int>>();
	vector<int> *foo;
	// get the next line
	while ( getline(cin, line) ) {
		// starting from non-empty line, keep scanning for a graph
		if (!line.empty()) {
			// init a new vector
			foo = new vector<int>();
			// for each line, break into tokens.
			stringstream ss(line);
			while(getline(ss, token, ' ')){
				// if can parse as int, push
				if (stringstream(token) >> i)
				{
					foo->push_back(i);
					// cout << " " << i;
				}
			}
			graph->push_back(*foo);
			// cout << "\nbreak" << endl;
		}

		else {
			cout << "flush" << endl;
			group.push_back(*graph);
			cout << "group size: " << group.size() << endl;
		}

		if (group.size()==2)
		{
			cout << "You ahve entered two." << endl;
			break;
		}

	}

	// cout << group[0][0][0] << endl;

	// for each row in graph
	for (auto it = group[1].begin(); it != group[1].end(); it++) {
		cout << "head " << (*it)[0] << ": ";
		for (size_t i = 1; i < (*it).size(); ++i)
		{
			cout << (*it)[i] << " ";
		}
		cout << endl;
	}

}




int main(int argc, char const *argv[])
{
	AdjMat foo = AdjMat();
	int N = 0;
	vector<vector<vector<int>>> group;
	foo.handler(N, group);
	return 0;
}